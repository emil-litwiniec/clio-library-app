import db from "../db/index";

import utils from "../utils/utils";
import {columnNames} from "../utils/columnNames";

const Publishers = {
    async add(req, res) {
        if(!req.body.name){
            return res.status(400).send({"message": "Please, provide name for the new publisher."})
        }

        const searchQuery = `SELECT pub_id
        FROM publishers
        WHERE LOWER(name) = '${req.body.name.toLowerCase()}'`
        ;

        const query = `INSERT INTO
        publishers(name, est_year, address, origin)
        VALUES($1, $2, $3, $4)
        RETURNING *`
        ;

        const values = [
            req.body.name,
            req.body.estYear,
            req.body.address,
            req.body.origin
        ];

        try {
            const { rows: publisherExists } = await db.query(searchQuery);


            if(publisherExists[0]) {
                const pubId = publisherExists[0].pub_id;
                return res.status(400).send({'message': `Publisher with this name already exists in the database with id of: ${pubId}.`})
            }


            const { rows: publisher } = await db.query(query, values);

            if(!publisher[0]) {
                return res.status(400).send({"message": "Unable to create publisher."})
            }

            return res.status(200).send(publisher[0]);
        } catch (err) {
            return res.status(400).send(err);
        } 
    },

    async remove(req, res) {
        if(!req.body.pubId) {
            return res.status(400).send({"message": "Please, provide id of the publisher to remove."})
        }

        const query = `DELETE FROM publishers
        WHERE pub_id=${req.body.pubId}
        RETURNING *`;

        try {
            const { rows: removedPub } = await db.query(query);
            if(!removedPub[0]) {
                return res.status(404).send({"message": `Unable to find publisher with id of: ${req.body.pubId}.` })
            }

            return res.status(200).send({"message": "Publisher has been deleted."});
        } catch(err) {
            return res.status(400).send(err);
        }
    },
    async update(req, res) {
        if(!req.body.pubId) {
            return res.status(400).send({"message": "Please, provide id of a publisher."})
        }

        const dbColumns = utils.setColumnsNames(req, columnNames.publishers);
        const values = utils.setPublishersValuesNames(req);

        const setQueries = utils.setQueries(dbColumns, values);
        
        const updateQuery = `UPDATE publishers
        SET ${setQueries}
        WHERE pub_id = ${req.body.pubId}
        RETURNING *`
        ;

        try {

            const {rows: publisher} = await db.query(updateQuery);
            if(!publisher[0]) {
                return res.status(404).send({"message": `Unable to find publisher with id of: ${req.body.pubId}.`})
            }
            return res.status(200).send({"message": "Publisher has been updated."})
        } catch(err) {
            return res.status(400).send(err);
        }
    }

}


export default Publishers;