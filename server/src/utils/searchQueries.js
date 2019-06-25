import moment from "moment";

const searchQueries = {
    selectBook: `SELECT A.title AS title,
	A.book_id,
    A.series,
    A.edition,
    A.isbn,
    A.keywords,
    A.ukd,
    A.pub_year AS year,
    CONCAT(B.first_name, ' ', B.last_name) AS author,
    C.name AS publisher,
    D.genre_name AS genre,
    CONCAT(E.first_name, ' ', E.last_name) AS translator,
    CASE WHEN F.brought_date IS NULL AND F.borrow_id IS NOT NULL THEN
    	'true'
    	ELSE
    	'false'
    	END  
    	AS isBorrowed,
    CASE WHEN G.res_date > timestamp '${moment(new Date()).format()}' THEN
    	'true'
   		ELSE 
   		'false'
   		END
   		AS isReserved
FROM books AS A
LEFT JOIN authors AS B ON A .author_id = B.author_id
LEFT JOIN publishers AS C ON A .pub_id = C.pub_id
LEFT JOIN genres AS D ON A .genre_id = D.genre_id
LEFT JOIN translators AS E ON A .translator_id = E.translator_id
LEFT JOIN (
	SELECT borrow_id, book_id, exp_brought_date, brought_date
	FROM borrows
	WHERE brought_date IS NULL
) 	AS F 
	ON A.book_id = F.book_id
LEFT JOIN reservations AS G ON A .book_id = G.book_id`,

    selectAuthor: `SELECT CONCAT(first_name, ' ', last_name) AS author,
    origin
FROM authors`,

    select (param) {
        switch(param){
            case 'b':
                return this.selectBook;
            case 'a':
                return this.selectAuthor;
            default:
                return res.status(400).send({"message": "default query"})
        }
    }
};

const queryFormat = {
    whereClause(col, vals, query) {

        const colSwitch = (col, query) => {
            switch(col) {
                case 'title':
                    return 'A.title';
                case 'author': 
                if(query == 'b') {
                    return ['B.first_name', 'B.last_name']
                } else if (query == 'a') {
                    return ['first_name', 'last_name']
                }
                    break;
                case 'genre':
                    return `D.genre_name`;
                case 'publisher':
                    return `C.name`;
                case 'translator':
                    return `CONCAT(E.first_name, ' ', E.last_name)`;
            }
        }

        if(typeof col === 'string' && typeof vals === 'string') {
            col = [col];
            vals = [vals]
        }
        if(col.length == 1 && vals.length == 1) {
            let newCol = colSwitch(col[0], query);
            console.log('newCol:', newCol);
            if(col[0] === 'author') {
                return `\n WHERE ${newCol[0]} ~* '(\\m${vals[0]}\)'
                 OR ${newCol[1]} ~* '(\\m${vals[0]}\)'`
            }

            return `\n WHERE ${newCol} ~* '(\\m${vals[0]}\)'`

        } else if(col.length > 1 && vals.length > 1 ) {

            let newQuery = col[0] == 'author' ? `\n WHERE ${col[0]} ~* '(\\m${vals[0]}\)'` :
             `\n WHERE ${colSwitch(col[0], query)[0]} ~* '(\\m${vals[0]}\)' 
             OR ${colSwitch(col[0],query)[1]} ~* '(\\m${vals[0]}\)'`;
            for(let i = 1; i < col.length; i++) {
                let newCol = col[i];
                let nextQuery = `\n AND ${newCol} ~* '(\\m${vals[i]}\)'`
                if(col[i] === 'author') {
                    nextQuery = `\n AND ${newCol[0]} ~* '(\\m${vals[0]}\)'
                     OR ${newCol[1]} ~* '(\\m${vals[0]}\)'`
                }

               
                newQuery = newQuery + nextQuery;
            };
            return newQuery;
        }
    },
    yearRange(obj, hasCols) {


        let keys = Object.keys(obj);
       if(keys.length === 0) {
           return '';
       }
    //    console.log(keys.length);
        if(keys.length === 1) {
            // console.log(keys[0]);
            if(keys[0] === 'yearStart') {
                if(hasCols) {
                    return `\n AND A.pub_year >= ${obj.yearStart} AND A.pub_year <= 3000`
                }
                return `\n WHERE A.pub_year >= ${obj.yearStart} AND A.pub_year <= 3000`;

            } else if (keys[0] === 'yearEnd') {
                if(hasCols) {
                    return `\n AND A.pub_year >= 0 AND A.pub_year <= ${obj.yearEnd}`
                }
                return `\n WHERE A.pub_year >= 0 AND A.pub_year <= ${obj.yearEnd}`;
            }
        }

        if(hasCols) {
            return `\n AND A.pub_year >= ${obj.yearStart} AND A.pub_year <= ${obj.yearEnd}`
        }

        return `\n WHERE A.pub_year >= ${obj.yearStart} AND A.pub_year <= ${obj.yearEnd}`
    }
}


export {searchQueries, queryFormat};