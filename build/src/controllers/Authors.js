"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

var _searchQueries = require("../utils/searchQueries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Authors = {
  insert: function () {
    var _insert = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var searchQuery, query, _ref, rows, values, response;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.firstName || !req.body.lastName)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': "Provide name and last name of the author."
              }));

            case 2:
              searchQuery = "SELECT *\n        FROM authors\n        WHERE LOWER(first_name) = '".concat(req.body.firstName.toLowerCase(), "'\n        AND\n            LOWER(last_name) = '").concat(req.body.lastName.toLowerCase(), "'");
              query = "INSERT INTO\n        authors(first_name, last_name, origin)\n        VALUES($1, $2, $3)\n        RETURNING *";
              _context.prev = 4;
              _context.next = 7;
              return _index["default"].query(searchQuery);

            case 7:
              _ref = _context.sent;
              rows = _ref.rows;

              if (!rows[0]) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': 'This author already exists.'
              }));

            case 11:
              values = [req.body.firstName, req.body.lastName, req.body.origin];
              _context.next = 14;
              return _index["default"].query(query, values);

            case 14:
              response = _context.sent;
              return _context.abrupt("return", res.status(201).send({
                "message": "Author has been created"
              }));

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 18]]);
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
      var query, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.authorId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                'message': "Provide data to start the query."
              }));

            case 2:
              query = "DELETE\n        FROM authors\n        WHERE author_id = ".concat(req.body.authorId, "\n        RETURNING *");
              _context2.prev = 3;
              _context2.next = 6;
              return _index["default"].query(query);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                "message": "Author not found."
              }));

            case 10:
              return _context2.abrupt("return", res.status(200).send({
                "message": "Author has been deleted"
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
      var findOne, _ref3, rows, head, values, updateQuery, response;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.body.authorId) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                "message": "Provide author id"
              }));

            case 2:
              findOne = "SELECT *\n        FROM authors\n        WHERE author_id = ".concat(req.body.authorId);
              _context3.prev = 3;
              _context3.next = 6;
              return _index["default"].query(findOne);

            case 6:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                "message": "Author not found"
              }));

            case 10:
              head = {
                first: req.body.firstName,
                last: req.body.lastName,
                origin: req.body.origin
              };
              values = {
                firstName: head.first.length == 0 && !head.first ? rows[0].firstName : head.first,
                lastName: head.last.length == 0 && !head.last ? rows[0].lastName : head.last,
                origin: head.origin.length == 0 && !head.origin ? rows[0].origin : head.origin
              }; // return res.send(values);

              updateQuery = "UPDATE authors\n            SET first_name = '".concat(values.firstName, "',\n                last_name = '").concat(values.lastName, "',\n                origin = '").concat(values.origin, "'\n            WHERE author_id = ").concat(req.body.authorId, "\n            RETURNING *");
              _context3.next = 15;
              return _index["default"].query(updateQuery);

            case 15:
              response = _context3.sent;
              return _context3.abrupt("return", res.status(200).send({
                "message": "Author has been updated."
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 19]]);
    }));

    function update(_x5, _x6) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  getAuthor: function () {
    var _getAuthor = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var getAuthorQuery, _ref4, authorResult;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (req.body.authorId) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                "message": "Please, provide author's id."
              }));

            case 2:
              getAuthorQuery = "SELECT * FROM authors\n        WHERE author_id = '".concat(req.body.authorId, "'");
              _context4.prev = 3;
              _context4.next = 6;
              return _index["default"].query(getAuthorQuery);

            case 6:
              _ref4 = _context4.sent;
              authorResult = _ref4.rows;

              if (authorResult[0]) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                "message": "Author not found"
              }));

            case 10:
              return _context4.abrupt("return", res.status(200).send(authorResult));

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

    function getAuthor(_x7, _x8) {
      return _getAuthor.apply(this, arguments);
    }

    return getAuthor;
  }(),
  getAuthorAndBooks: function () {
    var _getAuthorAndBooks = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var getAuthorQuery, getBooksQuery, _ref5, _ref6, author, books;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (req.body.authorId) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(200).send({
                "message": "Please, provide author's id."
              }));

            case 2:
              getAuthorQuery = "SELECT * FROM authors\n        WHERE author_id = '".concat(req.body.authorId, "'");
              getBooksQuery = _searchQueries.searchQueries.selectBook + "\n WHERE A.author_id = '".concat(req.body.authorId, "'");
              _context5.prev = 4;
              _context5.next = 7;
              return Promise.all([_index["default"].query(getAuthorQuery), _index["default"].query(getBooksQuery)]);

            case 7:
              _ref5 = _context5.sent;
              _ref6 = _slicedToArray(_ref5, 2);
              author = _ref6[0].rows;
              books = _ref6[1].rows;
              return _context5.abrupt("return", res.status(200).send({
                author: author,
                books: books
              }));

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](4);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[4, 14]]);
    }));

    function getAuthorAndBooks(_x9, _x10) {
      return _getAuthorAndBooks.apply(this, arguments);
    }

    return getAuthorAndBooks;
  }(),
  getAllAuthors: function () {
    var _getAllAuthors = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var getAllAuthors, _ref7, authors;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              getAllAuthors = 'SELECT * FROM authors';
              _context6.prev = 1;
              _context6.next = 4;
              return _index["default"].query(getAllAuthors);

            case 4:
              _ref7 = _context6.sent;
              authors = _ref7.rows;

              if (authors[0]) {
                _context6.next = 8;
                break;
              }

              return _context6.abrupt("return", res.status(400).send({
                "message": "Unable to get authors."
              }));

            case 8:
              return _context6.abrupt("return", res.status(200).send(authors));

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(400).send(_context6.t0));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 11]]);
    }));

    function getAllAuthors(_x11, _x12) {
      return _getAllAuthors.apply(this, arguments);
    }

    return getAllAuthors;
  }()
};
var _default = Authors;
exports["default"] = _default;