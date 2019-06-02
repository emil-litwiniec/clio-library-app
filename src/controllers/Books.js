import moment from "moment";
import uuidv4 from "uuid/v4";

import db from "../db/index";


const Books = {
    async insert(req, res) {

        if (!req.body.title || !req.body.authorId || !req.body.lang || !req.body.isbn) {
            return res.status(400).send({ "message": "Please, provide all required values..." });
        };

        const query = `INSERT INTO
        books(book_id, title, author_id, series, edition, genre_id, 
            keywords, ukd, lang, pub_year, translator_id, pub_id, isbn, create_date)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        returning *`;

        const values = [
            uuidv4(),
            req.body.title,
            req.body.authorId,
            req.body.series,
            req.body.edition,
            req.body.genreId,
            req.body.keywords,
            req.body.ukd,
            req.body.lang,
            req.body.pub_year,
            req.body.translator_id,
            req.body.pub_id,
            req.body.isbn,
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(query, values);
            return res.status(201).send(rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}



export default Books;