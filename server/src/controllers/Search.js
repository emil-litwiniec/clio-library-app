import db from "../db/index";
import {searchQueries, queryFormat } from "../utils/searchQueries";

const Search = {
    async search(req, res) {
        const params = req.query;
        console.log('params', params)
        if(Object.entries(params).length == 0) {
            return res.status(400).send({"message": "Enter at least one value to search"});
        }
        
        // build yearRange object depending on available query string parameters
        let yearRange = {};
        Object.entries(params).forEach(el => {
            if(el[0] === 'yearStart') {
                yearRange.yearStart = el[1];
            } else if (el[0] === 'yearEnd') {
                yearRange.yearEnd = el[1];
            }
        });

        // check query string for specific parameters
        const areYears = Object.keys(yearRange).length === 0 ? false : true;
        const orderQuery =  params.order ? queryFormat.orderBy(params.order) : '';



        const titleClause = () => {
            if(params.query === 'a' || Object.keys(params).includes('author')) {
                return " "
            } else {
                return `\n WHERE A.title ~* '(\\m${params.title}\)'`
            }
        }

        const authorClause = () => {
            if(Object.keys(params).includes('title')) {
                return ""
            } else if (params.query === 'a' ) {
                return `\n WHERE (first_name ~* '(\\m${params.author}\)' OR last_name ~* '(\\m${params.author}\)')`
            } else if (params.query === 'b') {
               return `\n WHERE (B.first_name ~* '(\\m${params.author}\)' OR B.last_name ~* '(\\m${params.author}\)')`
            }
        }

        const genreClause = () => {
            if(params.query === 'a' || params.genreId === 'all' || params.genreId ===  '') {
                return ''
            } else {
                return ` AND D.genre_id = ${params.genreId}` 
            }
        }

        // check if years data is supplied and if it's not searching in authors - 'a'
        const yearRangeClauseFn = () => {
            if(areYears) {
                if(params.query === 'a') {
                    return ''
                } else {
                    return queryFormat.yearRange(yearRange)
                }
            }
            return ''
        }

        const query = searchQueries.select(params.query) + titleClause() + authorClause()
            + yearRangeClauseFn() + genreClause() + orderQuery;

            console.log('Search.js query: ', query);


        try {
            const { rows } = await db.query(query);
            // console.log(rows);
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