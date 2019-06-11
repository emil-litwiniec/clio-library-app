

const searchQueries = {
    selectBook: `SELECT A.title, 
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


export default searchQueries;