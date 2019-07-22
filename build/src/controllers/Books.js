"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _index = _interopRequireDefault(require("../db/index"));

var _utils = _interopRequireDefault(require("../utils/utils"));

var _columnNames = require("../utils/columnNames");

var _searchQueries = require("../utils/searchQueries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Books = {
  insert: function () {
    var _insert = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var searchAuthorQuery, _ref, authorId, insertQuery, query, values, authorResponse, insertValuesAlt, _ref2, _rows, insertValues, _ref3, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.title || !req.body.authorFirst || !req.body.authorLast || !req.body.lang || !req.body.isbn)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'Please, provide all required values...'
              }));

            case 2:
              searchAuthorQuery = "SELECT author_id\n        FROM authors\n        WHERE LOWER(first_name) = '".concat(req.body.authorFirst.toLowerCase(), "'\n        AND\n            LOWER(last_name) = '").concat(req.body.authorLast.toLowerCase(), "'");
              _context.prev = 3;
              _context.next = 6;
              return _index["default"].query(searchAuthorQuery);

            case 6:
              _ref = _context.sent;
              authorId = _ref.rows;
              insertQuery = "INSERT INTO\n                books(book_id, title, author_id, series, edition, genre_id, \n                    keywords, ukd, lang, pub_year, translator_id, pub_id, isbn, create_date)\n                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)\n                returning *";

              if (authorId[0]) {
                _context.next = 23;
                break;
              }

              query = "INSERT INTO\n                authors(first_name, last_name, origin)\n                VALUES($1, $2, $3)\n                RETURNING *";
              values = [req.body.authorFirst, req.body.authorLast, req.body.authorOrigin];
              _context.next = 14;
              return _index["default"].query(query, values);

            case 14:
              authorResponse = _context.sent;

              if (authorResponse.rows[0]) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'Something went wrong with adding author to the database.'
              }));

            case 17:
              insertValuesAlt = [(0, _v["default"])(), req.body.title, authorResponse.rows[0].author_id, req.body.series, req.body.edition, req.body.genreId, req.body.keywords, req.body.ukd, req.body.lang, req.body.pubYear, req.body.translatorId, req.body.pubId, req.body.isbn, (0, _moment["default"])(new Date())];
              _context.next = 20;
              return _index["default"].query(insertQuery, insertValuesAlt);

            case 20:
              _ref2 = _context.sent;
              _rows = _ref2.rows;
              return _context.abrupt("return", res.status(201).send(_rows[0]));

            case 23:
              insertValues = [(0, _v["default"])(), req.body.title, authorId[0].author_id, req.body.series, req.body.edition, req.body.genreId, req.body.keywords, req.body.ukd, req.body.lang, req.body.pubYear, req.body.translatorId, req.body.pubId, req.body.isbn, (0, _moment["default"])(new Date())];
              _context.next = 26;
              return _index["default"].query(insertQuery, insertValues);

            case 26:
              _ref3 = _context.sent;
              rows = _ref3.rows;
              return _context.abrupt("return", res.status(201).send(rows[0]));

            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 31]]);
    }));

    function insert(_x, _x2) {
      return _insert.apply(this, arguments);
    }

    return insert;
  }(),
  remove: function () {
    var _remove = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var query, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.bookId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Provide id of the book to delete'
              }));

            case 2:
              query = "DELETE\n        FROM books\n        WHERE book_id = '".concat(req.body.bookId, "'\n        RETURNING *");
              _context2.prev = 3;
              _context2.next = 6;
              return _index["default"].query(query);

            case 6:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'book not found'
              }));

            case 10:
              return _context2.abrupt("return", res.status(200).send({
                message: 'The book has been deleted.'
              }));

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 13]]);
    }));

    function remove(_x3, _x4) {
      return _remove.apply(this, arguments);
    }

    return remove;
  }(),
  update: function () {
    var _update = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var searchAuthorQuery, _ref5, authorId, _query2, values, authorResponse, _filteredRequestEntries, _dbColumnsEntries, _setQueries, _query, _ref6, rows, dbColumnsEntries, setQueries, query, _ref7, _rows2;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.body.bookId) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(200).send({
                message: 'Provide id of the book to update'
              }));

            case 2:
              if (!(req.body.authorLast && req.body.authorFirst)) {
                _context3.next = 34;
                break;
              }

              searchAuthorQuery = "SELECT author_id\n            FROM authors\n            WHERE LOWER(first_name) = '".concat(req.body.authorFirst.toLowerCase(), "'\n            AND\n                LOWER(last_name) = '").concat(req.body.authorLast.toLowerCase(), "'");
              _context3.prev = 4;
              _context3.next = 7;
              return _index["default"].query(searchAuthorQuery);

            case 7:
              _ref5 = _context3.sent;
              authorId = _ref5.rows;

              if (authorId[0]) {
                _context3.next = 17;
                break;
              }

              _query2 = "INSERT INTO\n                    authors(first_name, last_name, origin)\n                    VALUES($1, $2, $3)\n                    RETURNING *";
              values = [req.body.authorFirst, req.body.authorLast, req.body.authorOrigin || null];
              _context3.next = 14;
              return _index["default"].query(_query2, values);

            case 14:
              authorResponse = _context3.sent;

              if (authorResponse.rows[0]) {
                _context3.next = 17;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'Something went wrong with adding author to the database.'
              }));

            case 17:
              _filteredRequestEntries = Object.entries(req.body).filter(function (entry) {
                if (entry[0] === 'bookId' || entry[0] === 'authorFirst' || entry[0] === 'authorLast') {
                  return false;
                } else {
                  return true;
                }
              });
              _dbColumnsEntries = _utils["default"].setColumnsNamesFromEntries(_filteredRequestEntries, _columnNames.columnNames.books);
              _setQueries = _dbColumnsEntries.map(function (el) {
                return "".concat(el[0], " = ").concat(el[1]);
              });

              _setQueries.push("author_id = ".concat(authorId[0].author_id));

              _query = "UPDATE books\n        SET last_update = '".concat((0, _moment["default"])(new Date()).format(), "',\n            ").concat(_setQueries, "\n        WHERE book_id = '").concat(req.body.bookId, "'\n        RETURNING *");
              _context3.next = 24;
              return _index["default"].query(_query);

            case 24:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context3.next = 28;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'book not found'
              }));

            case 28:
              return _context3.abrupt("return", res.status(200).send({
                message: 'The book has beed updated.'
              }));

            case 31:
              _context3.prev = 31;
              _context3.t0 = _context3["catch"](4);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 34:
              dbColumnsEntries = _utils["default"].setColumnsNamesFromEntries(filteredRequestEntries, _columnNames.columnNames.books);
              setQueries = dbColumnsEntries.map(function (el) {
                return "".concat(el[0], " = ").concat(el[1]);
              });
              query = "UPDATE books\n        SET last_update = '".concat((0, _moment["default"])(new Date()).format(), "',\n            ").concat(setQueries, "\n        WHERE book_id = '").concat(req.body.bookId, "'\n        RETURNING *");
              _context3.prev = 37;
              _context3.next = 40;
              return _index["default"].query(query);

            case 40:
              _ref7 = _context3.sent;
              _rows2 = _ref7.rows;

              if (_rows2[0]) {
                _context3.next = 44;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'book not found'
              }));

            case 44:
              return _context3.abrupt("return", res.status(200).send({
                message: 'The book has beed updated.'
              }));

            case 47:
              _context3.prev = 47;
              _context3.t1 = _context3["catch"](37);
              return _context3.abrupt("return", res.status(400).send(_context3.t1));

            case 50:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[4, 31], [37, 47]]);
    }));

    function update(_x5, _x6) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  getBook: function () {
    var _getBook = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var getBookQuery, _ref8, book;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (req.body.bookId) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                message: 'Please, provide id of the book.'
              }));

            case 2:
              getBookQuery = _searchQueries.searchQueries.selectBook + "\n WHERE A.book_id = '".concat(req.body.bookId, "'");
              _context4.prev = 3;
              _context4.next = 6;
              return _index["default"].query(getBookQuery);

            case 6:
              _ref8 = _context4.sent;
              book = _ref8.rows;

              if (book[0]) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(404).send());

            case 10:
              return _context4.abrupt("return", res.status(200).send(book[0]));

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 13]]);
    }));

    function getBook(_x7, _x8) {
      return _getBook.apply(this, arguments);
    }

    return getBook;
  }(),
  searchBookId: function () {
    var _searchBookId = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var bookId, searchQuery, _ref9, books;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              // search for books that are not borrowed
              bookId = req.query.bookId;
              searchQuery = "\n            SELECT\n            A.book_id\n        FROM books AS A\n        WHERE A.book_id::text LIKE '".concat(bookId, "%'\n        \tAND NOT EXISTS\n        ( SELECT *\n         FROM borrows\n         WHERE borrows.book_id = A.book_id\n        )");
              _context5.prev = 2;
              _context5.next = 5;
              return _index["default"].query(searchQuery);

            case 5:
              _ref9 = _context5.sent;
              books = _ref9.rows;
              return _context5.abrupt("return", res.status(200).send(books));

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 10]]);
    }));

    function searchBookId(_x9, _x10) {
      return _searchBookId.apply(this, arguments);
    }

    return searchBookId;
  }(),
  searchAllBookId: function () {
    var _searchAllBookId = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var bookId, searchQuery, _ref10, books;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              // search for all books whether borrowed or not borrowed
              bookId = req.query.bookId;
              searchQuery = "\n            SELECT\n            A.book_id\n        FROM books AS A\n        WHERE A.book_id::text LIKE '".concat(bookId, "%'\n        \t");
              _context6.prev = 2;
              _context6.next = 5;
              return _index["default"].query(searchQuery);

            case 5:
              _ref10 = _context6.sent;
              books = _ref10.rows;
              return _context6.abrupt("return", res.status(200).send(books));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(400).send(_context6.t0));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 10]]);
    }));

    function searchAllBookId(_x11, _x12) {
      return _searchAllBookId.apply(this, arguments);
    }

    return searchAllBookId;
  }()
};
var _default = Books;
exports["default"] = _default;