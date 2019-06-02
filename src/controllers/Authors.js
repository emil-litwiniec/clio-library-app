import db from "../db/index";

const Authors = {
    async insert(req, res) {
        if(!req.body.firstName || !req.body.lastName) {
            return res.status(400).send({'message': "Provide name and last name of the author."})
        }

        const query = `INSERT INTO
        authors(first_name, last_name, origin)
        VALUES($1, $2, $3)
        RETURNING *`;

        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.origin
        ];


        try {
            const { rows } = await db.query(query, values);

            if(!rows[0]) {
                return res.status(404).send({'message': 'Something wrong with a query.'})
            }

            return res.status(200).send(rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default Authors;