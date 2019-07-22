"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryFormat = exports.searchQueries = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var searchQueries = {
  selectBook: "SELECT A.title AS title,\n    A.book_id,\n    A.author_id,\n    A.series,\n    A.edition,\n    A.isbn,\n    A.keywords,\n    A.ukd,\n    A.lang,\n    A.pub_year AS year,\n    CONCAT(B.first_name, ' ', B.last_name) AS author,\n    B.first_name,\n    B.last_name,\n    C.name AS publisher,\n    C.pub_id,\n    D.genre_name AS genre,\n    D.genre_id,\n    CONCAT(E.first_name, ' ', E.last_name) AS translator,\n    CASE WHEN EXISTS\n        ( SELECT *\n         FROM borrows\n         WHERE borrows.book_id = A.book_id\n        ) THEN\n        'true'\n        ELSE\n        'false'\n        END\n        AS is_borrowed,\n    CASE WHEN G.res_date > timestamp '".concat((0, _moment["default"])(new Date()).format(), "' THEN\n        'true'\n           ELSE \n           'false'\n           END\n           AS is_reserved\n    FROM books AS A\n    LEFT JOIN authors AS B ON A .author_id = B.author_id\n    LEFT JOIN publishers AS C ON A .pub_id = C.pub_id\n    LEFT JOIN genres AS D ON A .genre_id = D.genre_id\n    LEFT JOIN translators AS E ON A .translator_id = E.translator_id\n    LEFT JOIN borrows AS F ON A .book_id = F.book_id\n    LEFT JOIN reservations AS G ON A .book_id = G.book_id"),
  selectAuthor: "SELECT CONCAT(first_name, ' ', last_name) AS author,\n    origin, author_id\nFROM authors",
  select: function select(param) {
    switch (param) {
      case 'b':
        return this.selectBook;

      case 'a':
        return this.selectAuthor;

      default:
        return res.status(400).send({
          "message": "default query"
        });
    }
  }
};
exports.searchQueries = searchQueries;
var queryFormat = {
  whereClause: function whereClause(col, vals, query) {
    var colSwitch = function colSwitch(col, query) {
      switch (col) {
        case 'title':
          return 'A.title';

        case 'author':
          if (query == 'b') {
            return ['B.first_name', 'B.last_name'];
          } else if (query == 'a') {
            return ['first_name', 'last_name'];
          }

          break;

        case 'genre':
          return "D.genre_id";

        case 'publisher':
          return "C.name";

        case 'translator':
          return "CONCAT(E.first_name, ' ', E.last_name)";
      }
    };

    if (typeof col === 'string' && typeof vals === 'string') {
      col = [col];
      vals = [vals];
    }

    if (col.length == 1 && vals.length == 1) {
      var newCol = colSwitch(col[0], query);

      if (col[0] === 'author') {
        return "\n WHERE ".concat(newCol[0], " ~* '(\\m").concat(vals[0], ")'\n                 OR ").concat(newCol[1], " ~* '(\\m").concat(vals[0], ")'");
      } else if (col[0] === 'genre') {
        return "\n WHERE D.genre_id = ".concat(vals[0]);
      }

      return "\n WHERE ".concat(newCol, " ~* '(\\m").concat(vals[0], ")'");
    } else if (col.length > 1 && vals.length > 1) {
      var newQuery = "\n WHERE ".concat(col[0], " ~* '(\\m").concat(vals[0], ")'");

      if (col[0] === 'author') {
        newQuery = "\n WHERE ".concat(colSwitch(col[0], query)[0], " ~* '(\\m").concat(vals[0], ")' \n                OR ").concat(colSwitch(col[0], query)[1], " ~* '(\\m").concat(vals[0], ")'");
      } else if (col[0] === 'genre') {
        newQuery = "\n WHERE D.genre_id = ".concat(vals[0]);
      }

      for (var i = 1; i < col.length; i++) {
        var _newCol = col[i];
        var nextQuery = "\n AND ".concat(_newCol, " ~* '(\\m").concat(vals[i], ")'");

        if (col[i] === 'author') {
          nextQuery = "\n AND ".concat(_newCol[0], " ~* '(\\m").concat(vals[0], ")'\n                     OR ").concat(_newCol[1], " ~* '(\\m").concat(vals[0], ")'");
        } else if (col[i] === 'genre') {
          nextQuery = "\n AND D.genre_id = ".concat(vals[0]);
        }

        newQuery = newQuery + nextQuery;
      }

      ;
      return newQuery;
    }
  },
  yearRange: function yearRange(obj, hasCols) {
    var keys = Object.keys(obj);

    if (keys.length === 0) {
      return '';
    } //    console.log(keys.length);


    if (keys.length === 1) {
      // console.log(keys[0]);
      if (keys[0] === 'yearStart') {
        if (hasCols) {
          return "\n AND A.pub_year >= ".concat(obj.yearStart, " AND A.pub_year <= 3000");
        }

        return "\n WHERE A.pub_year >= ".concat(obj.yearStart, " AND A.pub_year <= 3000");
      } else if (keys[0] === 'yearEnd') {
        if (hasCols) {
          return "\n AND A.pub_year >= 0 AND A.pub_year <= ".concat(obj.yearEnd);
        }

        return "\n WHERE A.pub_year >= 0 AND A.pub_year <= ".concat(obj.yearEnd);
      }
    }

    if (hasCols) {
      return "\n AND A.pub_year >= ".concat(obj.yearStart, " AND A.pub_year <= ").concat(obj.yearEnd);
    }

    return "\n WHERE A.pub_year >= ".concat(obj.yearStart, " AND A.pub_year <= ").concat(obj.yearEnd);
  },
  orderBy: function orderBy(orderParam) {
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
        break;
    }
  }
};
exports.queryFormat = queryFormat;