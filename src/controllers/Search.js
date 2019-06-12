import db from "../db/index";
import {searchQueries, queryFormat } from "../utils/searchQueries";

const Search = {
    async search(req, res) {
        const params = req.query;

        if(Object.entries(params).length == 0) {
            return res.status(400).send({"message": "Enter at least one value to search"});
        }

        function queryParam1(val) {
            switch (val){
                case 'b':
                    return 'books';
                case 'a':
                    return 'authors';
                default: 
                    return 'books';
            }
        }
        const queryTable = queryParam1(params.query);
        const query = searchQueries.selectBook + queryFormat.whereClause(params.col, params.value);

        
        try {
            const { rows } = await db.query(query);
            if(!rows[0]) {
                return res.status(404).send({"message": "Book not found"})
            }
            return res.status(200).send(rows);
        } catch(err) {
            return res.status(400).send({"message": "something went wrong with search"});
        }


    }
}


export default Search;