import moment from "moment";
import uuidv4 from "uuid/v4";
import _uniqby from "lodash.uniqby"

import db from "../db/index";


import utils from "../utils/utils";
import {columnNames} from "../utils/columnNames";
import { searchQueries } from "../utils/searchQueries";


const Books = {
    async insert(req, res) {

        if (!req.body.title || !req.body.authorFirst || !req.body.authorLast || !req.body.lang || !req.body.isbn) {
            return res.status(400).send({ "message": "Please, provide all required values..." });
        };

        const searchAuthorQuery = `SELECT author_id
        FROM authors
        WHERE LOWER(first_name) = '${req.body.authorFirst.toLowerCase()}'
        AND
            LOWER(last_name) = '${req.body.authorLast.toLowerCase()}'`;

            
            try {
                const { rows: authorId } = await db.query(searchAuthorQuery);

            
                const insertQuery = `INSERT INTO
                books(book_id, title, author_id, series, edition, genre_id, 
                    keywords, ukd, lang, pub_year, translator_id, pub_id, isbn, create_date)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                returning *`;
        
                

            if(!authorId[0]) {
                const query = `INSERT INTO
                authors(first_name, last_name, origin)
                VALUES($1, $2, $3)
                RETURNING *`;

                const values = [
                    req.body.authorFirst,
                    req.body.authorLast,
                    req.body.authorOrigin
                ];

                const authorResponse = await db.query(query, values);

                if(!authorResponse.rows[0]) {
                    return res.status(400).send({"message": "Something went wrong with adding author to the database."})
                }

                const insertValuesAlt = [
                    uuidv4(),
                    req.body.title,
                    authorResponse.rows[0].author_id,
                    req.body.series,
                    req.body.edition,
                    req.body.genreId,
                    req.body.keywords,
                    req.body.ukd,
                    req.body.lang,
                    req.body.pubYear,
                    req.body.translatorId,
                    req.body.pubId,
                    req.body.isbn,
                    moment(new Date())
                ];
                const { rows } = await db.query(insertQuery, insertValuesAlt);
                return res.status(201).send(rows[0]);

            }
            const insertValues = [
                uuidv4(),
                req.body.title,
                authorId[0].author_id,
                req.body.series,
                req.body.edition,
                req.body.genreId,
                req.body.keywords,
                req.body.ukd,
                req.body.lang,
                req.body.pubYear,
                req.body.translatorId,
                req.body.pubId,
                req.body.isbn,
                moment(new Date())
            ];
            const { rows } = await db.query(insertQuery, insertValues);
            return res.status(201).send(rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    async remove(req, res) {
        if(!req.body.bookId) {
            return res.status(400).send({'message': "Provide id of the book to delete"});
        }

        const query = `DELETE
        FROM books
        WHERE book_id = '${req.body.bookId}'
        RETURNING *`;

        try {
            const { rows } = await db.query(query);

            if(!rows[0]) {
                return res.status(404).send({"message": "book not found"})
            }
            return res.status(200).send({"message": "The book has been deleted."});
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    async update(req, res) {
        if(!req.body.bookId) {
            return res.status(200).send({'message': "Provide id of the book to update"})
        }

        if(req.body.authorLast && req.body.authorFirst) {
            const searchAuthorQuery = `SELECT author_id
            FROM authors
            WHERE LOWER(first_name) = '${req.body.authorFirst.toLowerCase()}'
            AND
                LOWER(last_name) = '${req.body.authorLast.toLowerCase()}'`;

            try {
                const { rows: authorId } = await db.query(searchAuthorQuery);
    
                if(!authorId[0]) {
                    const query = `INSERT INTO
                    authors(first_name, last_name, origin)
                    VALUES($1, $2, $3)
                    RETURNING *`;
    
                    const values = [
                        req.body.authorFirst,
                        req.body.authorLast,
                        req.body.authorOrigin || null
                    ];
    
                    const authorResponse = await db.query(query, values);
    
                    if(!authorResponse.rows[0]) {
                        return res.status(400).send({"message": "Something went wrong with adding author to the database."})
                    }
                }
            const filteredRequestEntries = Object.entries(req.body)
                .filter(entry => {
                    if(entry[0] === "bookId" || entry[0] === "authorFirst" || entry[0] === "authorLast") {
                        return false
                    }else {
                        return true
                    }
                })

            const dbColumnsEntries = utils.setColumnsNamesFromEntries(filteredRequestEntries, columnNames.books);
           

            const setQueries = dbColumnsEntries.map(el => `${el[0]} = ${el[1]}`);
            setQueries.push(`author_id = ${authorId[0].author_id}`);

            const query = `UPDATE books
        SET last_update = '${moment(new Date()).format()}',
            ${setQueries}
        WHERE book_id = '${req.body.bookId}'
        RETURNING *`;

        const { rows } = await db.query(query);

        if(!rows[0]) {
            return res.status(404).send({'message': "book not found"});
        }
        return res.status(200).send({'message': "The book has beed updated."})
            } catch (err) {
                return res.status(400).send(err);
            }
        }

        const dbColumnsEntries = utils.setColumnsNamesFromEntries(
            filteredRequestEntries,
            columnNames.books
        );

        const setQueries = dbColumnsEntries.map(
            el => `${el[0]} = ${el[1]}`
        );


        const query = `UPDATE books
        SET last_update = '${moment(new Date()).format()}',
            ${setQueries}
        WHERE book_id = '${req.body.bookId}'
        RETURNING *`;

        try {
            const { rows } = await db.query(query);

            if(!rows[0]) {
                return res.status(404).send({'message': "book not found"});
            }
            return res.status(200).send({'message': "The book has beed updated."})
        } catch (err) {
            return res.status(400).send(err);
        }
    },
    async getBook(req, res) {
        if(!req.body.bookId) {
            return res.status(400).send({"message": "Please, provide id of the book."})
        }
        const getBookQuery = searchQueries.selectBook + `\n WHERE A.book_id = '${req.body.bookId}'`

        try {
            const { rows: book } = await db.query(getBookQuery);

            if(!book[0]) {
                return res.status(404).send()
            }

            return res.status(200).send(book[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
    async searchBookId(req,res) {
        const { bookId } = req.query;


            const searchQuery = `
            SELECT
            A.book_id, 
            C.isBorrowed, 
            C.brought_date
        FROM books AS A
        LEFT JOIN (
        SELECT
            B.book_id,
            F.brought_date,
            CASE WHEN F.brought_date IS NULL AND F.borrow_id IS NOT NULL THEN
                true
                ELSE
                FALSE
                END  
                AS isBorrowed
        FROM books AS B
        LEFT JOIN (
            SELECT borrow_id, book_id, exp_brought_date, brought_date
            FROM borrows
        ) 	AS F 
            ON B.book_id = F.book_id
        ) AS C
        ON A.book_id = C.book_id
        WHERE A.book_id::text LIKE '${bookId}%'`

        try {
						const { rows: books } = await db.query(searchQuery);

						const borrowedBooks = books.filter(el => el.isborrowed === true);
						let availableBooks = books;
						borrowedBooks.forEach(({book_id}) => {
								availableBooks = availableBooks.filter(el => el.book_id !== book_id)
						});

						availableBooks = _uniqby(availableBooks, 'book_id');

						

            return res.status(200).send(availableBooks);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

}



export default Books;