"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _index = _interopRequireDefault(require("../db/index.js"));

var _Helper = _interopRequireDefault(require("./Helper"));

var _columnNames = require("../utils/columnNames");

var _utils = _interopRequireDefault(require("../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, query, values, _ref, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Please, provide all required values"
              }));

            case 2:
              if (_Helper["default"].isValidEmail(req.body.email)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': "Please enter valid email address"
              }));

            case 4:
              hashPassword = _Helper["default"].hashPassword(req.body.password);
              query = "INSERT INTO\n        users(id, first_name, last_name, email, password, phone_number)\n        VALUES($1, $2, $3, $4, $5, $6)\n        returning *";
              values = [(0, _v["default"])(), req.body.firstName, req.body.lastName, req.body.email, hashPassword, req.body.phoneNumber || undefined];
              _context.prev = 7;
              _context.next = 10;
              return _index["default"].query(query, values);

            case 10:
              _ref = _context.sent;
              user = _ref.rows;

              if (user[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Unable to create user."
              }));

            case 14:
              return _context.abrupt("return", res.status(200).send({
                "message": "User has been created"
              }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](7);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(200).send({
                'message': "This email is already taken."
              }));

            case 21:
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 17]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  update: function () {
    var _update = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var hashPassword, filteredRequestEntries, dbColumnsEntries, setQueries, updateQuery, _ref2, user;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.userId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Please, provide id of the user."
              }));

            case 2:
              hashPassword = _Helper["default"].hashPassword(req.body.password);
              filteredRequestEntries = Object.entries(req.body).filter(function (entry) {
                if (entry[0] === "userId") {
                  return false;
                } else {
                  return true;
                }
              });

              if (req.body.password) {
                filteredRequestEntries.map(function (entry) {
                  if (entry[0] === "password") {
                    entry[1] = hashPassword;
                  }
                });
              }

              dbColumnsEntries = _utils["default"].setColumnsNamesFromEntries(filteredRequestEntries, _columnNames.columnNames.users);
              setQueries = dbColumnsEntries.map(function (el) {
                return "".concat(el[0], " = ").concat(el[1]);
              });
              updateQuery = "UPDATE users\n        SET ".concat(setQueries, "\n        WHERE id::text = '").concat(req.body.userId, "'\n        RETURNING *");
              _context2.prev = 8;
              _context2.next = 11;
              return _index["default"].query(updateQuery);

            case 11:
              _ref2 = _context2.sent;
              user = _ref2.rows;

              if (user[0]) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Unable to find user."
              }));

            case 15:
              return _context2.abrupt("return", res.status(200).send({
                "message": "User data updated"
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](8);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[8, 18]]);
    }));

    function update(_x3, _x4) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var query, _ref3, rows, text, _ref4, isAdmin, isAdminBoolean, token;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                "message": "Please provide all required values"
              }));

            case 2:
              if (_Helper["default"].isValidEmail(req.body.email)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                'message': "Please enter valid email address"
              }));

            case 4:
              query = 'SELECT * FROM users WHERE email = $1';
              _context3.prev = 5;
              _context3.next = 8;
              return _index["default"].query(query, [req.body.email]);

            case 8:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                'message': "User with this email does not exist"
              }));

            case 12:
              if (_Helper["default"].comparePassword(rows[0].password, req.body.password)) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                'message': 'Password is invalid'
              }));

            case 14:
              ;

              if (!rows[0]) {
                _context3.next = 25;
                break;
              }

              text = "SELECT * FROM admins WHERE user_id::text = '".concat(rows[0].id, "'");
              _context3.next = 19;
              return _index["default"].query(text);

            case 19:
              _ref4 = _context3.sent;
              isAdmin = _ref4.rows;
              isAdminBoolean = isAdmin[0] ? true : false;
              console.log("USER ROWS:", rows[0].first_name, rows[0].last_name);
              token = _Helper["default"].generateToken(rows[0].id, isAdminBoolean, rows[0].first_name, rows[0].last_name);
              return _context3.abrupt("return", res.status(200).send({
                token: token,
                admin: isAdminBoolean,
                userId: rows[0].id,
                firstName: rows[0].first_name,
                lastName: rows[0].last_name
              }));

            case 25:
              _context3.next = 30;
              break;

            case 27:
              _context3.prev = 27;
              _context3.t0 = _context3["catch"](5);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 30:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 27]]);
    }));

    function login(_x5, _x6) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var query, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              query = "DELETE FROM users WHERE user_id=$1 returning *";
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(query, [req.user.id]);

            case 4:
              _ref5 = _context4.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                "message": 'user not found'
              }));

            case 8:
              ;
              return _context4.abrupt("return", res.status(200).send({
                'message': 'user deleted'
              }));

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 12]]);
    }));

    function _delete(_x7, _x8) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  getData: function () {
    var _getData = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var userQuery, borrowsQuery, borrowsHistoryQuery, reservationsQuery, _ref6, _ref7, user, borrows, borrowsHistory, reservations;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (req.query.userId) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(200).send({
                "message": "Please, provide user id."
              }));

            case 2:
              userQuery = "SELECT \n        first_name, \n        last_name, \n        email, \n        phone_number\n        FROM users\n        WHERE id::text = '".concat(req.query.userId, "'");
              borrowsQuery = "SELECT\n            A.borrow_id,\n            A.book_id,\n            A.taken_date,\n            A.exp_brought_date,\n            A.prolongs,\n            B.title,\n            CONCAT(C.first_name, ' ', C.last_name) AS author,\n            B.pub_year,\n            B.isbn\n        FROM\n            borrows AS A\n        LEFT JOIN books AS B ON\n            A.book_id = B.book_id\n        LEFT JOIN authors AS C ON\n            B.author_id = C.author_id\n        WHERE\n            A.user_id::text = '".concat(req.query.userId, "'");
              borrowsHistoryQuery = "SELECT\n        A.borrow_id,\n        A.book_id,\n        A.taken_date,\n        A.exp_brought_date,\n        A.brought_date,\n        A.prolongs,\n        B.title,\n        CONCAT(C.first_name, ' ', C.last_name) AS author,\n        B.pub_year,\n        B.isbn\n    FROM\n        borrows_history AS A\n    LEFT JOIN books AS B ON\n        A.book_id = B.book_id\n    LEFT JOIN authors AS C ON\n        B.author_id = C.author_id\n    WHERE\n        A.user_id::text = '".concat(req.query.userId, "'");
              reservationsQuery = "SELECT\n            A.book_id,\n            A.res_id,\n            A.res_date,\n            B.title,\n            CONCAT(C.first_name, ' ', C.last_name) AS author,\n            B.pub_year,\n            B.isbn\n            FROM reservations AS A\n            LEFT JOIN books AS B ON\n            A.book_id = B.book_id\n        LEFT JOIN authors AS C ON\n            B.author_id = C.author_id\n        WHERE\n            A.user_id::text = '".concat(req.query.userId, "'");
              _context5.prev = 6;
              _context5.next = 9;
              return Promise.all([_index["default"].query(userQuery), _index["default"].query(borrowsQuery), _index["default"].query(borrowsHistoryQuery), _index["default"].query(reservationsQuery)]);

            case 9:
              _ref6 = _context5.sent;
              _ref7 = _slicedToArray(_ref6, 4);
              user = _ref7[0].rows;
              borrows = _ref7[1].rows;
              borrowsHistory = _ref7[2].rows;
              reservations = _ref7[3].rows;

              if (user[0]) {
                _context5.next = 17;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                "message": "Unable to find user with provided id."
              }));

            case 17:
              return _context5.abrupt("return", res.status(200).send({
                user: user[0],
                borrows: borrows,
                borrowsHistory: borrowsHistory,
                reservations: reservations
              }));

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](6);
              return _context5.abrupt("return", res.status(400).send(_context5.t0));

            case 23:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[6, 20]]);
    }));

    function getData(_x9, _x10) {
      return _getData.apply(this, arguments);
    }

    return getData;
  }(),
  searchUsers: function () {
    var _searchUsers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var userId, searchQuery, _ref8, users;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = req.query.userId;
              searchQuery = "SELECT id \n        FROM users\n        WHERE id::text LIKE '".concat(userId, "%'\n        LIMIT 10");
              _context6.prev = 2;
              _context6.next = 5;
              return _index["default"].query(searchQuery);

            case 5:
              _ref8 = _context6.sent;
              users = _ref8.rows;
              return _context6.abrupt("return", res.status(200).send(users));

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.statsu(400).send(_context6.t0));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 10]]);
    }));

    function searchUsers(_x11, _x12) {
      return _searchUsers.apply(this, arguments);
    }

    return searchUsers;
  }(),
  getUser: function () {
    var _getUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var getUserQuery, _ref9, user;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (req.query.userId) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return", res.status(400).send({
                "message": "Please, provide id of the user."
              }));

            case 2:
              getUserQuery = "SELECT \n        first_name,\n        last_name,\n        email,\n        phone_number\n        FROM users\n        WHERE id::text = '".concat(req.query.userId, "'");
              _context7.prev = 3;
              _context7.next = 6;
              return _index["default"].query(getUserQuery);

            case 6:
              _ref9 = _context7.sent;
              user = _ref9.rows;

              if (user[0]) {
                _context7.next = 10;
                break;
              }

              return _context7.abrupt("return", res.status(404).send({
                'message': "Unable to find user."
              }));

            case 10:
              return _context7.abrupt("return", res.status(200).send(user[0]));

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](3);
              return _context7.abrupt("return", res.status(400).send(_context7.t0));

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[3, 13]]);
    }));

    function getUser(_x13, _x14) {
      return _getUser.apply(this, arguments);
    }

    return getUser;
  }()
};
var _default = User;
exports["default"] = _default;