"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Auth = {
  verifyToken: function () {
    var _verifyToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.cookies['x-access-token'].token;

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': "Token is not provided"
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 6:
              decoded = _context.sent;
              text = 'SELECT * FROM users WHERE id = $1';
              _context.next = 10;
              return _index["default"].query(text, [decoded.userId]);

            case 10:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                'message': 'The token you provided is invalid'
              }));

            case 14:
              req.user = {
                id: decoded.userId
              };
              next();
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 18]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }(),
  verifyAdminToken: function () {
    var _verifyAdminToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var token, decoded, text, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = req.cookies['x-access-token'].token;

              if (token) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                'message': "Token is not provided"
              }));

            case 3:
              _context2.prev = 3;
              _context2.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 6:
              decoded = _context2.sent;
              text = 'SELECT * FROM admins WHERE user_id = $1';
              _context2.next = 10;
              return _index["default"].query(text, [decoded.userId]);

            case 10:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                'message': 'You are not authorized'
              }));

            case 14:
              req.user = {
                id: decoded.userId
              };
              next();
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 18]]);
    }));

    function verifyAdminToken(_x4, _x5, _x6) {
      return _verifyAdminToken.apply(this, arguments);
    }

    return verifyAdminToken;
  }(),
  decodeToken: function () {
    var _decodeToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var token, _ref3, admin, userId, firstName, lastName;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              token = req.body['x-access-token'];

              if (token) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                "message": "Provide access token"
              }));

            case 3:
              _context3.prev = 3;
              _context3.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 6:
              _ref3 = _context3.sent;
              admin = _ref3.admin;
              userId = _ref3.userId;
              firstName = _ref3.firstName;
              lastName = _ref3.lastName;
              return _context3.abrupt("return", res.status(200).send({
                admin: admin,
                userId: userId,
                firstName: firstName,
                lastName: lastName
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", res.status(400).send({
                "message": "Unable to decode the token"
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 14]]);
    }));

    function decodeToken(_x7, _x8) {
      return _decodeToken.apply(this, arguments);
    }

    return decodeToken;
  }()
};
var _default = Auth;
exports["default"] = _default;