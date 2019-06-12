

const searchQueries = {
    selectBook: `SELECT A.title AS title, 
    A.series,
    A.edition,
    A.isbn,
    A.keywords,
    A.ukd,
    CONCAT(B.first_name, ' ', B.last_name) AS author,
    C.name AS publisher,
    D.genre_name AS genre,
    CONCAT(E.first_name, ' ', E.last_name) AS translator
FROM books AS A
LEFT JOIN authors AS B ON A .author_id = B.author_id
LEFT JOIN publishers AS C ON A .pub_id = C.pub_id
LEFT JOIN genres AS D ON A .genre_id = D.genre_id
LEFT JOIN translators AS E ON A .translator_id = E.translator_id`,

    selectAllAuthors: `SELECT CONCAT(first_name + ' ' + last_name) AS author,
    origin
FROM authors`,
    selectAuthor: `SELECT CONCAT(first_name + ' ' + last_name) AS author,
    origin
    FROM authors
    WHERE CONCAT(LOWER(first_name) + ' ' + LOWER(last_name)) = ''`
};

const queryFormat = {
    whereClause(col, vals) {
        if(typeof col === 'string' && typeof vals === 'string') {
            col = [col];
            vals = [vals]
        }
        if(col.length == 1 && vals.length == 1) {
            console.log(typeof col, typeof vals)
            return `\n WHERE ${col[0]} ~* '(\\m${vals[0]}\\M)'`
        } else if(col.length > 1 && vals.length > 1 ) {
            console.log(typeof col, typeof vals)
            let query = `\n WHERE ${col[0]} ~* '(\\m${vals[0]}\\M)'`;
            for(let i = 1; i < col.length; i++) {
                let newCol = col[i];

                switch(col[i]) {
                    case 'author': 
                        newCol = `CONCAT(B.first_name, ' ', B.last_name)`;
                        break;
                    case 'genre':
                        newCol = `D.genre_name`;
                        break;
                    case 'publisher':
                        newCol = `C.name`;
                        break;
                    case 'translator':
                        newCol = `CONCAT(E.first_name, ' ', E.last_name)`;
                        break;
                }
                query = query + `\n AND ${newCol} ~* '(\\m${vals[i]}\\M)'`;
            };
            return query;
        }
    }
}


export {searchQueries, queryFormat};