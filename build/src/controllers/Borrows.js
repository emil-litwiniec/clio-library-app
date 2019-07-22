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

var Borrows = {
  add: function () {
    var _add = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var userQuery, bookQuery, _ref, isUser, _ref2, isBook, borrowedQuery, _ref3, isBorrowed, insertQuery, insertValues, _ref4, insertBorrow;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.userId || !req.body.bookId)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: "Please, provide\n            user id and book id."
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
                message: "Provided data doesn't exist in the database."
              }));

            case 15:
              // Check if book is already borrowed
              borrowedQuery = "SELECT * \n            FROM borrows\n            WHERE book_id = '".concat(req.body.bookId, "'");
              _context.next = 18;
              return _index["default"].query(borrowedQuery);

            case 18:
              _ref3 = _context.sent;
              isBorrowed = _ref3.rows;

              if (!isBorrowed[0]) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'The book is already borrowed.'
              }));

            case 22:
              insertQuery = "INSERT INTO\n            borrows(borrow_id ,user_id, book_id, taken_date, exp_brought_date, prolongs)\n            VALUES($1, $2, $3, $4, $5, $6)\n            RETURNING *";
              insertValues = [(0, _v["default"])(), req.body.userId, req.body.bookId, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date()).add(3, 'weeks'), 0];
              _context.next = 26;
              return _index["default"].query(insertQuery, insertValues);

            case 26:
              _ref4 = _context.sent;
              insertBorrow = _ref4.rows;

              if (insertBorrow[0]) {
                _context.next = 30;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'There is something wrong with the borrow.'
              }));

            case 30:
              return _context.abrupt("return", res.status(201).send(insertBorrow[0]));

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
  bookReturn: function () {
    var _bookReturn = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var searchIfBorrowed, deleteQuery, insertBorrowsHistoryQuery, setBackQuery, _ref5, isBrought, _ref6, deletedBorrow, insertValuesBorrowsHistory, inserValuesSetBack, _ref7, insertBorrowsHistory, _ref8, bookSetBack;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.borrowId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Please, provide id of the borrow.'
              }));

            case 2:
              searchIfBorrowed = "SELECT *\n        FROM borrows\n        WHERE borrow_id='".concat(req.body.borrowId, "'");
              deleteQuery = "DELETE FROM borrows \n        WHERE borrow_id='".concat(req.body.borrowId, "'\n        RETURNING *");
              insertBorrowsHistoryQuery = "INSERT INTO\n            borrows_history(borrow_id ,user_id, book_id, taken_date, exp_brought_date, brought_date, prolongs)\n            VALUES($1, $2, $3, $4, $5, $6, $7)\n            RETURNING *";
              setBackQuery = "INSERT INTO\n            borrows(borrow_id ,user_id, book_id, taken_date, exp_brought_date)\n            VALUES($1, $2, $3, $4, $5)\n            RETURNING *";
              _context2.prev = 6;
              _context2.next = 9;
              return _index["default"].query(searchIfBorrowed);

            case 9:
              _ref5 = _context2.sent;
              isBrought = _ref5.rows;

              if (isBrought[0]) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Unable to find the book.'
              }));

            case 13:
              _context2.next = 15;
              return _index["default"].query(deleteQuery);

            case 15:
              _ref6 = _context2.sent;
              deletedBorrow = _ref6.rows;

              if (deletedBorrow[0]) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Unable to delete book from current borrows.'
              }));

            case 19:
              insertValuesBorrowsHistory = [isBrought[0].borrow_id, isBrought[0].user_id, isBrought[0].book_id, isBrought[0].taken_date, isBrought[0].exp_brought_date, (0, _moment["default"])(new Date()).format(), isBrought[0].prolongs];
              inserValuesSetBack = [isBrought[0].borrow_id, isBrought[0].user_id, isBrought[0].book_id, isBrought[0].taken_date, isBrought[0].exp_brought_date, isBrought[0].prolongs];
              _context2.next = 23;
              return _index["default"].query(insertBorrowsHistoryQuery, insertValuesBorrowsHistory);

            case 23:
              _ref7 = _context2.sent;
              insertBorrowsHistory = _ref7.rows;

              if (insertBorrowsHistory[0]) {
                _context2.next = 33;
                break;
              }

              _context2.next = 28;
              return _index["default"].query(setBackQuery, inserValuesSetBack);

            case 28:
              _ref8 = _context2.sent;
              bookSetBack = _ref8.rows;

              if (bookSetBack[0]) {
                _context2.next = 32;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                message: 'Unable to set borrow in borrows history. Borrow has been deleted.'
              }));

            case 32:
              return _context2.abrupt("return", res.status(400).send({
                message: 'Unable to set borrow in borrows history. Borrow has been restored.'
              }));

            case 33:
              return _context2.abrupt("return", res.status(200).send({
                message: 'The book has been returned'
              }));

            case 36:
              _context2.prev = 36;
              _context2.t0 = _context2["catch"](6);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 39:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 36]]);
    }));

    function bookReturn(_x3, _x4) {
      return _bookReturn.apply(this, arguments);
    }

    return bookReturn;
  }(),
  remove: function () {
    var _remove = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var deleteQuery, _ref9, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.body.borrowId) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'Please, provide id of the borrow.'
              }));

            case 2:
              deleteQuery = "DELETE FROM borrows\n        WHERE borrow_id='".concat(req.body.borrowId, "'\n        RETURNING *");
              _context3.prev = 3;
              _context3.next = 6;
              return _index["default"].query(deleteQuery);

            case 6:
              _ref9 = _context3.sent;
              rows = _ref9.rows;

              if (rows[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                message: 'Something wrong with the query.'
              }));

            case 10:
              return _context3.abrupt("return", res.status(200).send({
                message: "Borrow ".concat(req.body.borrowId, " has been deleted.")
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

    function remove(_x5, _x6) {
      return _remove.apply(this, arguments);
    }

    return remove;
  }(),
  prolong: function () {
    var _prolong = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var selectQuery, _ref10, prolongAmount, expBroughtDate, now, prolongQuery, _ref11, prolongs;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (req.body.borrowId) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                message: 'Please, provide id of the borrow.'
              }));

            case 2:
              selectQuery = "SELECT prolongs, exp_brought_date\n        FROM borrows\n        WHERE borrow_id = '".concat(req.body.borrowId, "'");
              _context4.prev = 3;
              _context4.next = 6;
              return _index["default"].query(selectQuery);

            case 6:
              _ref10 = _context4.sent;
              prolongAmount = _ref10.rows;

              if (!(prolongAmount[0].prolongs >= 3)) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                message: 'You have exceeded maximum amount of prolongs.'
              }));

            case 10:
              expBroughtDate = prolongAmount[0].exp_brought_date;
              now = (0, _moment["default"])(new Date());

              if (!now.isAfter(expBroughtDate)) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                message: 'Unable to prolong the book.'
              }));

            case 14:
              prolongQuery = "UPDATE borrows\n            SET prolongs = prolongs + 1,\n                exp_brought_date = '".concat((0, _moment["default"])(expBroughtDate).add(2, 'w').format(), "'\n            WHERE borrow_id = '").concat(req.body.borrowId, "'\n            RETURNING *");
              _context4.next = 17;
              return _index["default"].query(prolongQuery);

            case 17:
              _ref11 = _context4.sent;
              prolongs = _ref11.rows;

              if (prolongs[0]) {
                _context4.next = 21;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                message: 'Unable to find the borrow.'
              }));

            case 21:
              return _context4.abrupt("return", res.status(200).send(prolongs[0]));

            case 24:
              _context4.prev = 24;
              _context4.t0 = _context4["catch"](3);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 24]]);
    }));

    function prolong(_x7, _x8) {
      return _prolong.apply(this, arguments);
    }

    return prolong;
  }()
};
var _default = Borrows;
exports["default"] = _default;