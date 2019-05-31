import moment from "moment";
import uuidv4 from "uuid/v4";
import db from '../db/index.js';
import Helper from "./Helper";

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
        users(id, name, surname, email, password, phone_number)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

        const values = [
            uuidv4(),
            req.body.name,
            req.body.surname,
            req.body.email,
            hashPassword,
            req.body.phone_number || undefined
        ];

        try {
            const { rows } = await db.query(query, values);
            const token = Helper.generateToken(rows[0].id);
            res.cookie('x-access-token', { token });
            return res.status(200).send();

        } catch (err) {
            if (err.routine === '_bt_check_unique') {
                return res.status(400).send({'message': "This email is already taken."})
            }
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
    },

    async delete(req, res) {

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
    }

}

export default User;