import db from '../db/index';

const Filters = {
    async getAll (req, res) {
        const genresQuery = 'SELECT * FROM genres';
        const authorsQuery = `SELECT CONCAT(first_name, ' ', last_name) AS author,
        author_id
        FROM authors`;
        const publishersQuery = 'SELECT pub_id, name FROM publishers';
        const translatorsQuery = `SELECT 
        CONCAT(first_name, ' ', last_name) AS translator, translator_id
        FROM translators`;

        try{
            const [
                { rows: genres },
                { rows: authors },
                { rows: publishers },
                { rows: translators }
            ] = await Promise.all([
                db.query(genresQuery),
                db.query(authorsQuery),
                db.query(publishersQuery),
                db.query(translatorsQuery)
            ]);

            return res.status(200).send({
                genres, 
                authors, 
                publishers,
                translators
            });
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}


export default Filters;