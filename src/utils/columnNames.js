


const columnNames = {
    books (val) {
        switch (val) {
            case 'title':
                return 'title';
            case 'authorId':
                return 'author_id';
            case 'series':
                return 'series';
            case 'edition':
                return 'edition';
            case 'genreId':
                return 'genre_id';
            case 'keywords':
                return 'keywords';
            case 'ukd':
                return 'ukd';
            case 'lang':
                return 'lang';
            case 'pubYear':
                return 'pub_year';
            case 'translatorId':
                return 'translator_id';
            case 'pubId':
                return 'pub_id';
            case 'isbn':
                return 'isbn';
            default:
                return ;
        }
    },
    publishers (val) {
        switch(val) {
            case 'name':
                return 'name';
            case 'estYear':
                return 'est_year';
            case 'address':
                return 'address';
            case 'origin':
                return 'origin';
            default:
                return;
        }
    }
};

export { columnNames };