

const searchQueries = {
    selectBook: `SELECT A.title AS title, 
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
    	AS isBorrowed
FROM books AS A
LEFT JOIN authors AS B ON A .author_id = B.author_id
LEFT JOIN publishers AS C ON A .pub_id = C.pub_id
LEFT JOIN genres AS D ON A .genre_id = D.genre_id
LEFT JOIN translators AS E ON A .translator_id = E.translator_id
LEFT JOIN borrows AS F ON A .book_id = F.book_id`,

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
                case 'author': 
                if(query == 'b') {
                    return `CONCAT(B.first_name, ' ', B.last_name)`;
                } else if (query == 'a') {
                    return `CONCAT(first_name, ' ', last_name)`
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
            return `\n WHERE ${newCol} ~* '(\\m${vals[0]}\\M)'`

        } else if(col.length > 1 && vals.length > 1 ) {

            let query = `\n WHERE ${col[0]} ~* '(\\m${vals[0]}\\M)'`;
            for(let i = 1; i < col.length; i++) {
                let newCol = col[i];

               
                query = query + `\n AND ${newCol} ~* '(\\m${vals[i]}\\M)'`;
            };
            return query;
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