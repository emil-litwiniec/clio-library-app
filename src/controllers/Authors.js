import db from "../db/index";

const Authors = {
    async insert(req, res) {
        if(!req.body.firstName || !req.body.lastName) {
            return res.status(400).send({'message': "Provide name and last name of the author."})
        }

        const searchQuery = `SELECT *
        FROM authors
        WHERE LOWER(first_name) = '${req.body.firstName.toLowerCase()}'
        AND
            LOWER(last_name) = '${req.body.lastName.toLowerCase()}'`;

        const query = `INSERT INTO
        authors(first_name, last_name, origin)
        VALUES($1, $2, $3)
        RETURNING *`;

        try {
            // search if provided names match already existing author 
            const { rows } = await db.query(searchQuery); 

            if(rows[0]) {
                return res.status(404).send({'message': 'This author already exists.'})
            }
            const values = [
                req.body.firstName,
                req.body.lastName,
                req.body.origin
            ];

            const response = await db.query(query, values);

            return res.status(200).send(response.rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },

    async remove(req,res) {
        if(!req.body.authorId) {
            return res.status(400).send({'message': "Provide data to start the query."})
        }

        const query = `DELETE
        FROM authors
        WHERE author_id = ${req.body.authorId}
        RETURNING *`;

        try {
            const { rows } = await db.query(query);

            if(!rows[0]) {
                return res.status(404).send({"message": "Author not found."})
            }

            return res.status(200).send(rows[0])

        } catch(err) {
            return res.status(400).send(err);
        }
    }
}

export default Authors;