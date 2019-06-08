import db from "../db/index";

const Translators = {
    async add(req, res) {
        if(!req.body.firstName || !req.body.lastName) {
            return res.status(400).send({"message": "Please, provide first and last name of a translator."})
        }

        const searchQuery = `SELECT *
        FROM translators
        WHERE 
            LOWER(first_name)='${req.body.firstName.toLowerCase()}'
        AND
            LOWER(last_name)='${req.body.lastName.toLowerCase()}'`
        ;

        const addQuery = `INSERT INTO
        translators(first_name, last_name)
        VALUES($1, $2)
        RETURNING *`
        ;

        const values = [
            req.body.firstName,
            req.body.lastName
        ];


        try {
            const { rows: translatorExists } = await db.query(searchQuery);


            if(translatorExists[0]) {
                const id = translatorExists[0].translator_id;
                return res.status(400).send({"message": `Translator with that name already exists in the database with an id of: ${id}.`})
            }

            const { rows: translator } = await db.query(addQuery, values);

            if(!translator[0]) {
                return res.status(400).send({"message": "Unable to add a translator."})
            }

            return res.status(200).send(translator[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    },
    async remove(req, res) {
        if(!req.body.translatorId) {
            return res.status(400).send({"message": "Please, provide id of the translator to remove."})
        }

        const query = `DELETE FROM translators
        WHERE translator_id = ${req.body.translatorId}
        RETURNING *`;

        try {
            const { rows: removedTranslator } = await db.query(query);

            if(!removedTranslator[0]) {
                return res.status(404).send({"message": `Unable to find translator with id of: ${req.body.translatorId}`});

            }

            return res.status(200).send({"message": "Translator has been deleted."})
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}


export default Translators;