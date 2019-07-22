"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

var _utils = _interopRequireDefault(require("../utils/utils"));

var _columnNames = require("../utils/columnNames");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Publishers = {
  add: function () {
    var _add = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var searchQuery, query, values, _ref, publisherExists, pubId, _ref2, publisher;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (req.body.name) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Please, provide name for the new publisher."
              }));

            case 2:
              searchQuery = "SELECT pub_id\n        FROM publishers\n        WHERE LOWER(name) = '".concat(req.body.name.toLowerCase(), "'");
              query = "INSERT INTO\n        publishers(name, est_year, address, origin)\n        VALUES($1, $2, $3, $4)\n        RETURNING *";
              values = [req.body.name, req.body.estYear, req.body.address, req.body.origin];
              _context.prev = 5;
              _context.next = 8;
              return _index["default"].query(searchQuery);

            case 8:
              _ref = _context.sent;
              publisherExists = _ref.rows;

              if (!publisherExists[0]) {
                _context.next = 13;
                break;
              }

              pubId = publisherExists[0].pub_id;
              return _context.abrupt("return", res.status(400).send({
                'message': "Publisher with this name already exists in the database with id of: ".concat(pubId, ".")
              }));

            case 13:
              _context.next = 15;
              return _index["default"].query(query, values);

            case 15:
              _ref2 = _context.sent;
              publisher = _ref2.rows;

              if (publisher[0]) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Unable to create publisher."
              }));

            case 19:
              return _context.abrupt("return", res.status(200).send({
                "message": "Publisher has been created"
              }));

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](5);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 22]]);
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
      var query, _ref3, removedPub;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.pubId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Please, provide id of the publisher to remove."
              }));

            case 2:
              query = "DELETE FROM publishers\n        WHERE pub_id=".concat(req.body.pubId, "\n        RETURNING *");
              _context2.prev = 3;
              _context2.next = 6;
              return _index["default"].query(query);

            case 6:
              _ref3 = _context2.sent;
              removedPub = _ref3.rows;

              if (removedPub[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                "message": "Unable to find publisher with id of: ".concat(req.body.pubId, ".")
              }));

            case 10:
              return _context2.abrupt("return", res.status(200).send({
                "message": "Publisher has been deleted."
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
      var filteredRequestEntries, dbColumnsEntries, setQueries, updateQuery, _ref4, publisher;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.body.pubId) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                "message": "Please, provide id of a publisher"
              }));

            case 2:
              filteredRequestEntries = Object.entries(req.body).filter(function (entry) {
                if (entry[0] === "pubId") {
                  return false;
                } else {
                  return true;
                }
              });
              dbColumnsEntries = _utils["default"].setColumnsNamesFromEntries(filteredRequestEntries, _columnNames.columnNames.publishers);
              setQueries = dbColumnsEntries.map(function (el) {
                return "".concat(el[0], " = ").concat(el[1]);
              });
              updateQuery = "UPDATE publishers\n        SET ".concat(setQueries, "\n        WHERE pub_id = ").concat(req.body.pubId, "\n        RETURNING *");
              _context3.prev = 6;
              _context3.next = 9;
              return _index["default"].query(updateQuery);

            case 9:
              _ref4 = _context3.sent;
              publisher = _ref4.rows;

              if (publisher[0]) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                "message": "Unable to find publisher with id of: ".concat(req.body.pubId, ".")
              }));

            case 13:
              return _context3.abrupt("return", res.status(200).send({
                "message": "Publisher has been updated"
              }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](6);
              return _context3.abrupt("return", res.status(400).send(_context3.t0));

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[6, 16]]);
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
      var getAllPublishersQuery, _ref5, allPublishers;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              getAllPublishersQuery = "SELECT * FROM publishers";
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(getAllPublishersQuery);

            case 4:
              _ref5 = _context4.sent;
              allPublishers = _ref5.rows;

              if (allPublishers[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                "message": "Unable to serve publishers data."
              }));

            case 8:
              return _context4.abrupt("return", res.status(200).send(allPublishers));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 11]]);
    }));

    function getAll(_x7, _x8) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }()
};
var _default = Publishers;
exports["default"] = _default;