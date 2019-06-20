import db from '../db/index';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

const Reservations = {
    async add(req, res) {
        if(!req.body.userId || !req.body.bookId) {
            return res.status(400).send({"message": `Please, provide
            user id and book id.`})
        }

        try {

            // Check if book and user exist in the db

            const userQuery = `SELECT id FROM users WHERE id='${req.body.userId}'`; 
            const bookQuery = `SELECT book_id FROM books WHERE book_id='${req.body.bookId}'`; 

            const { rows: isUser } = await db.query(userQuery);
            const { rows: isBook } = await db.query(bookQuery);

            if(!isUser[0] || !isBook[0]) {
                return res.status(404).send({'message': "Provided data doesn't exist in the database."});
            }



            const reservedQuery = `SELECT * 
            FROM reservations
            WHERE book_id = '${req.body.bookId}'`;

            const { rows: isReserved } = await db.query(reservedQuery);

            if(isReserved[0]) {
                return res.status(400).send({"message" : "The book is reserved."})
            }

            const insertQuery = `INSERT INTO
            reservations(res_id ,user_id, book_id, res_date)
            VALUES($1, $2, $3, $4)
            RETURNING *`;
    
            const insertValues = [
                uuidv4(),
                req.body.userId,
                req.body.bookId,
                moment(new Date()).add(5, 'd')
            ];

            const { rows: insertReservation} = await db.query(insertQuery, insertValues);

            if(!insertReservation[0]) {
                return res.status(400).send({"message": "There is something wrong with the reservation."})
            }

            return res.status(200).send(insertReservation[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
    async remove(req ,res) {
        if(!req.body.resId) {
            return res.status(400).send({"message": "Please, provide id of the reservation."})
        }

        const deleteQuery = `DELETE FROM reservations
        WHERE res_id='${req.body.resId}'
        RETURNING *`;

        try {
            const { rows } = await db.query(deleteQuery);

            if(!rows[0]) {
                return res.status(400).send({"message": "Something wrong with the query."})
            }

            return res.status(200).send({'message': `Reservation ${req.body.resId} has been deleted.`})
        } catch(err) { 
            return res.status(400).send(err);
        }
    }
    
}

export default Reservations;