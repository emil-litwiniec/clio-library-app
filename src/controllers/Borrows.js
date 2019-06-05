import db from '../db/index';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

const Borrows = {
    async create(req, res) {
        if(!req.body.userId || !req.body.bookId) {
            return res.status(400).send({"message": `Please, provide
            user id and book id.`})
        }

        try {

            /**
             * TODO:
             *      check if book is available to borrow
             */

             
            const userQuery = `SELECT id FROM users WHERE id='${req.body.userId}'`; 
            const bookQuery = `SELECT book_id FROM books WHERE book_id='${req.body.bookId}'`; 

            const { rows: isUser } = await db.query(userQuery);
            const { rows: isBook } = await db.query(bookQuery);

            if(!isUser[0] || !isBook[0]) {
                return res.status(404).send({'message': "Provided data doesn't exist in the database."});
            }


            
            const insertQuery = `INSERT INTO
            borrows(borrow_id ,user_id, book_id, taken_date)
            VALUES($1, $2, $3, $4)
            RETURNING *`;
    
            const insertValues = [
                uuidv4(),
                req.body.userId,
                req.body.bookId,
                moment(new Date())
            ];

            const { rows: insertBorrow } = await db.query(insertQuery, insertValues);

            if(!insertBorrow[0]) {
                return res.status(400).send({"message": "There is something wrong with the borrow."})
            }

            return res.status(200).send(insertBorrow[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default Borrows;