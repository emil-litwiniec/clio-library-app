import moment from "moment";
import uuidv4 from "uuid/v4";
import db from '../db/index.js';
import Helper from "./Helper";
import { columnNames } from "../utils/columnNames";
import utils from "../utils/utils";

const User = {

    async create(req, res) {
       
        if(!req.body.name || !req.body.surname ||!req.body.email || !req.body.password) {
            return res.status(400).send({"message": "Please, provide all required values"})
        }

        if(!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': "Please enter valid email address"});
        }
        
        const hashPassword = Helper.hashPassword(req.body.password);

        const query = `INSERT INTO
        users(id, first_name, last_name, email, password, phone_number)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

        const values = [
            uuidv4(),
            req.body.name,
            req.body.surname,
            req.body.email,
            hashPassword,
            req.body.phoneNumber || undefined
        ];

        try {
            const { rows } = await db.query(query, values);
            // const token = Helper.generateToken(rows[0].id);
            // res.cookie('x-access-token', { token });
            return res.status(200).send();

        } catch (err) {
            if (err.routine === '_bt_check_unique') {
                return res.status(200).send({'message': "This email is already taken."})
            }
            return res.status(400).send(err);
        }
    },
    async update(req, res) {
        if(!req.body.userId) {
            return res.status(400).send({"message" : "Please, provide id of the user."})
        }

       
        const hashPassword = Helper.hashPassword(req.body.password);

        let filteredRequestEntries = Object.entries(req.body).filter(
            entry => {
                if (entry[0] === "userId") {
                    return false;
                } else {
                    return true;
                }
            }
        );
        if (req.body.password) {
            filteredRequestEntries.map(entry => {
                if (entry[0] === "password") {
                    entry[1] = hashPassword;
                }
            });
        }

        const dbColumnsEntries = utils.setColumnsNamesFromEntries(
            filteredRequestEntries,
            columnNames.users
        );
        const setQueries = dbColumnsEntries.map(
            el => `${el[0]} = ${el[1]}`
        );

        const updateQuery = `UPDATE users
        SET ${setQueries}
        WHERE id::text = '${req.body.userId}'
        RETURNING *`;

        try {
            const { rows: user } = await db.query(updateQuery);

            if(!user[0]) {
                return res.status(400).send({"message": "Unable to find user."})
            }

            return res.status(200).send({"message": "User data updated"})
        } catch (err) {
            return res.status(400).send(err);
        }

    },
    async login(req, res) {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send({"message": "Please provide all required values"})
        }
        if(!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({'message': "Please enter valid email address"});
        }

        const query = 'SELECT * FROM users WHERE email = $1';

        try {
            const { rows } = await db.query(query, [req.body.email]);
            if(!rows[0]) {
                return res.status(400).send({'message': "User with this email does not exist"})
            }
            if(!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({'message': 'Password is invalid'})
            };

            const token = Helper.generateToken(rows[0].id);
            
            res.cookie('x-access-token', { token });
            return res.status(200).send();
        } catch (err) {
            return res.status(400).send(err);
        }
    }, async delete(req, res) {

        const query = "DELETE FROM users WHERE user_id=$1 returning *";
        try {
            const { rows } = await db.query(query, [req.user.id]);
            if(!rows[0]) {
                return res.status(404).send({"message": 'user not found'})
            };
            return res.status(200).send({'message': 'user deleted'});
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async getData (req, res) {
        if(!req.query.userId) {
            return res.status(200).send({"message": "Please, provide user id."})
        }
        const userQuery = `SELECT 
        first_name, 
        last_name, 
        email, 
        phone_number
        FROM users
        WHERE id::text = '${req.query.userId}'`;

        const borrowsQuery = `SELECT
            A.borrow_id,
            A.taken_date,
            A.exp_brought_date,
            A.prolongs,
            B.title,
            CONCAT(C.first_name, ' ', C.last_name) AS author,
            B.pub_year,
            B.isbn
        FROM
            borrows AS A
        LEFT JOIN books AS B ON
            A.book_id = B.book_id
        LEFT JOIN authors AS C ON
            B.author_id = C.author_id
        WHERE
            A.user_id::text = '${req.query.userId}'
            AND A.brought_date IS NULL`;

        const borrowsHistoryQuery = `SELECT
        A.borrow_id,
        A.taken_date,
        A.exp_brought_date,
        A.brought_date,
        A.prolongs,
        B.title,
        CONCAT(C.first_name, ' ', C.last_name) AS author,
        B.pub_year,
        B.isbn
    FROM
        borrows AS A
    LEFT JOIN books AS B ON
        A.book_id = B.book_id
    LEFT JOIN authors AS C ON
        B.author_id = C.author_id
    WHERE
        A.user_id::text = '${req.query.userId}'
        AND A.brought_date IS NOT NULL`

        const reservationsQuery = `SELECT
            A.res_id,
            A.res_date,
            B.title,
            CONCAT(C.first_name, ' ', C.last_name) AS author,
            B.pub_year,
            B.isbn
            FROM reservations AS A
            LEFT JOIN books AS B ON
            A.book_id = B.book_id
        LEFT JOIN authors AS C ON
            B.author_id = C.author_id
        WHERE
            A.user_id::text = '${req.query.userId}'`;

        try {
            const [
                { rows: user },
                { rows: borrows },
                { rows: borrowsHistory },
                { rows: reservations }
            ] = await Promise.all([
                db.query(userQuery), 
                db.query(borrowsQuery), 
                db.query(borrowsHistoryQuery),
                db.query(reservationsQuery)
            ]);

            if(!user[0]) {
                return res.status(200).send({"message": "Unable to find user with provided id."})
            }

            return res.status(200).send({
                user: user[0],
                borrows,
                borrowsHistory,
                reservations
            })
        } catch(err) {
            return res.status(200).send(err);
        }
    },
    async searchUsers(req, res) {
        const { userId } = req.query;


        const searchQuery = `SELECT id 
        FROM users
        WHERE id::text LIKE '${userId}%'
        LIMIT 10`;

        try {
            const { rows: users } = await db.query(searchQuery);

            return res.status(200).send(users);
        } catch (err) {
            return res.statsu(400).send(err);
        }
    },
    async getUser(req, res) {
        if(!req.query.userId) {
            return res.status(400).send({"message": "Please, provide id of the user."})
        }

        const getUserQuery = `SELECT 
        first_name,
        last_name,
        email,
        phone_number
        FROM users
        WHERE id::text = '${req.query.userId}'`;

        try {
            const { rows: user } = await db.query(getUserQuery);
            if(!user[0]) {
                return res.status(400).send({'message': "Unable to find user."})
            }

            return res.status(200).send(user[0]);
        } catch(err) {

            return res.status(400).send(err);

        }
    }

}

export default User;