"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Reservations = {
  add: function () {
    var _add = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var userQuery, bookQuery, _ref, isUser, _ref2, isBook, reservedQuery, _ref3, isReserved, insertQuery, insertValues, _ref4, insertReservation;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.userId || !req.body.bookId)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Please, provide\n            user id and book id."
              }));

            case 2:
              _context.prev = 2;
              // Check if book and user exist in the db
              userQuery = "SELECT id FROM users WHERE id='".concat(req.body.userId, "'");
              bookQuery = "SELECT book_id FROM books WHERE book_id='".concat(req.body.bookId, "'");
              _context.next = 7;
              return _index["default"].query(userQuery);

            case 7:
              _ref = _context.sent;
              isUser = _ref.rows;
              _context.next = 11;
              return _index["default"].query(bookQuery);

            case 11:
              _ref2 = _context.sent;
              isBook = _ref2.rows;

              if (!(!isUser[0] || !isBook[0])) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                'message': "Provided data doesn't exist in the database."
              }));

            case 15:
              reservedQuery = "SELECT * \n            FROM reservations\n            WHERE book_id = '".concat(req.body.bookId, "'");
              _context.next = 18;
              return _index["default"].query(reservedQuery);

            case 18:
              _ref3 = _context.sent;
              isReserved = _ref3.rows;

              if (!isReserved[0]) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "The book is reserved."
              }));

            case 22:
              insertQuery = "INSERT INTO\n            reservations(res_id ,user_id, book_id, res_date)\n            VALUES($1, $2, $3, $4)\n            RETURNING *";
              insertValues = [(0, _v["default"])(), req.body.userId, req.body.bookId, (0, _moment["default"])(new Date()).add(5, 'd')];
              _context.next = 26;
              return _index["default"].query(insertQuery, insertValues);

            case 26:
              _ref4 = _context.sent;
              insertReservation = _ref4.rows;

              if (insertReservation[0]) {
                _context.next = 30;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "There is something wrong with the reservation."
              }));

            case 30:
              return _context.abrupt("return", res.status(200).send(insertReservation[0]));

            case 33:
              _context.prev = 33;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 33]]);
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
      var deleteQuery, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.resId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Please, provide id of the reservation."
              }));

            case 2:
              deleteQuery = "DELETE FROM reservations\n        WHERE res_id='".concat(req.body.resId, "'\n        RETURNING *");
              _context2.prev = 3;
              _context2.next = 6;
              return _index["default"].query(deleteQuery);

            case 6:
              _ref5 = _context2.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Something wrong with the query."
              }));

            case 10:
              return _context2.abrupt("return", res.status(200).send({
                'message': "Reservation ".concat(req.body.resId, " has been deleted.")
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
  removeOutdated: function () {
    var _removeOutdated = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var query, _ref6, deleted;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              query = "DELETE FROM reservations\n        WHERE res_id IN (\n            SELECT res_id \n            FROM reservations\n            WHERE res_date < timestamp '".concat((0, _moment["default"])(new Date()).format(), "'\n        )\n        RETURNING *");
              _context3.prev = 1;
              _context3.next = 4;
              return _index["default"].query(query);

            case 4:
              _ref6 = _context3.sent;
              deleted = _ref6.rows;

              if (!deleted[0]) {
                _context3.next = 9;
                break;
              }

              console.log("Outdated reservations have been deleted.");
              return _context3.abrupt("return");

            case 9:
              console.log("No outdated reservations.");
              return _context3.abrupt("return");

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](1);
              console.log('removeOutdated error: ', _context3.t0);
              return _context3.abrupt("return");

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 13]]);
    }));

    function removeOutdated() {
      return _removeOutdated.apply(this, arguments);
    }

    return removeOutdated;
  }()
};
var _default = Reservations;
exports["default"] = _default;