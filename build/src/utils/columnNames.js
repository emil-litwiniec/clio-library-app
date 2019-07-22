"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnNames = void 0;
var columnNames = {
  books: function books(val) {
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
        return;
    }
  },
  publishers: function publishers(val) {
    switch (val) {
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
  },
  users: function users(val) {
    switch (val) {
      case 'firstName':
        return 'first_name';

      case 'lastName':
        return 'last_name';

      case 'email':
        return 'email';

      case 'phoneNumber':
        return "phone_number";

      case 'password':
        return 'password';
    }
  }
};
exports.columnNames = columnNames;