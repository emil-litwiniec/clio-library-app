"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Genres = {
  add: function () {
    var _add = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var searchQuery, _ref, genreExists, genreId, insertQuery, _ref2, genre;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.genreName) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Please, provide name for the new genre."
              }));

            case 2:
              searchQuery = "SELECT genre_id\n        FROM genres\n        WHERE \n            LOWER(genre_name) = '".concat(req.body.genreName.toLowerCase(), "'");
              _context.prev = 3;
              _context.next = 6;
              return _index["default"].query(searchQuery);

            case 6:
              _ref = _context.sent;
              genreExists = _ref.rows;

              if (!genreExists[0]) {
                _context.next = 11;
                break;
              }

              genreId = genreExists[0].genre_id;
              return _context.abrupt("return", res.status(400).send({
                'message': "Genre with that name already exists with an id of: ".concat(genreId)
              }));

            case 11:
              insertQuery = "INSERT INTO\n            genres(genre_name)\n            VALUES($1)\n            returning *";
              _context.next = 14;
              return _index["default"].query(insertQuery, [req.body.genreName]);

            case 14:
              _ref2 = _context.sent;
              genre = _ref2.rows;

              if (genre) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': "something went wrong with the query"
              }));

            case 18:
              return _context.abrupt("return", res.status(200).send({
                "message": "Genre has been created"
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 21]]);
    }));

    function add(_x, _x2) {
      return _add.apply(this, arguments);
    }

    return add;
  }(),
  remove: function () {
    var _remove = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var query, _ref3, deletedGenre;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.genreId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Please, provide id of a genre to remove."
              }));

            case 2:
              query = "DELETE FROM genres\n        WHERE genre_id = ".concat(req.body.genreId, "\n        RETURNING *");
              _context2.prev = 3;
              _context2.next = 6;
              return _index["default"].query(query);

            case 6:
              _ref3 = _context2.sent;
              deletedGenre = _ref3.rows;

              if (deletedGenre[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                "message": "No such genre in the database."
              }));

            case 10:
              return _context2.abrupt("return", res.status(200).send({
                "message": "Genre has been deleted."
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
      var updateQuery, _ref4, genre;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.genreId || !req.body.genreNewName)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                "message": "Please, provide id and new name for genre."
              }));

            case 2:
              updateQuery = "UPDATE genres\n        SET genre_name = '".concat(req.body.genreNewName, "'\n        WHERE genre_id = ").concat(req.body.genreId, "\n        RETURNING *");
              _context3.prev = 3;
              _context3.next = 6;
              return _index["default"].query(updateQuery);

            case 6:
              _ref4 = _context3.sent;
              genre = _ref4.rows;

              if (genre[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                "message": "Unable to find genre with an id of: ".concat(req.body.genreId, ".")
              }));

            case 10:
              return _context3.abrupt("return", res.status(200).send({
                "message": "Genre has been updated."
              }));

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 13]]);
    }));

    function update(_x5, _x6) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  getAll: function () {
    var _getAll = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var getAllQuery, _ref5, allGenres;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              getAllQuery = 'SELECT * FROM genres';
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(getAllQuery);

            case 4:
              _ref5 = _context4.sent;
              allGenres = _ref5.rows;
              return _context4.abrupt("return", res.status(200).send(allGenres));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 9]]);
    }));

    function getAll(_x7, _x8) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }()
};
var _default = Genres;
exports["default"] = _default;