import moment from "moment";

const searchQueries = {
    selectBook: `SELECT A.title AS title,
    A.book_id,
    A.author_id,
    A.series,
    A.edition,
    A.isbn,
    A.keywords,
    A.ukd,
    A.lang,
    A.pub_year AS year,
    CONCAT(B.first_name, ' ', B.last_name) AS author,
    B.first_name,
    B.last_name,
    C.name AS publisher,
    C.pub_id,
    D.genre_name AS genre,
    D.genre_id,
    CONCAT(E.first_name, ' ', E.last_name) AS translator,
    CASE WHEN EXISTS
        ( SELECT *
         FROM borrows
         WHERE borrows.book_id = A.book_id
        ) THEN
        'true'
        ELSE
        'false'
        END
        AS is_borrowed,
    CASE WHEN G.res_date > timestamp '${moment(new Date()).format()}' THEN
        'true'
           ELSE 
           'false'
           END
           AS is_reserved
    FROM books AS A
    LEFT JOIN authors AS B ON A .author_id = B.author_id
    LEFT JOIN publishers AS C ON A .pub_id = C.pub_id
    LEFT JOIN genres AS D ON A .genre_id = D.genre_id
    LEFT JOIN translators AS E ON A .translator_id = E.translator_id
    LEFT JOIN borrows AS F ON A .book_id = F.book_id
    LEFT JOIN reservations AS G ON A .book_id = G.book_id`,

    selectAuthor: `SELECT CONCAT(first_name, ' ', last_name) AS author,
    origin, author_id
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
    yearRange(obj) {
        let keys = Object.keys(obj);
       if(keys.length === 0) {
           return '';
       }
        if(keys.length === 1) {
            if(keys[0] === 'yearStart') {
                    return `\n AND A.pub_year >= ${obj.yearStart} AND A.pub_year <= 3000`
            } else if (keys[0] === 'yearEnd') {
                    return `\n AND A.pub_year >= 0 AND A.pub_year <= ${obj.yearEnd}`
            }
        }
            return `\n AND A.pub_year >= ${obj.yearStart} AND A.pub_year <= ${obj.yearEnd}`
        

    },
    orderBy(orderParam) {
        switch (orderParam) {
            case 'titleAsc':
                return '\n ORDER BY title ASC';
            case 'titleDesc':
                return '\n ORDER BY title DESC';
            case 'authorAsc':
                return '\n ORDER BY author ASC';
            case 'authorDesc':
                return '\n ORDER BY author DESC';
            default:
                return '';
        }
    }
}


export {searchQueries, queryFormat};