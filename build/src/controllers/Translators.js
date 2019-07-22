"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Translators = {
  add: function () {
    var _add = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var searchQuery, addQuery, values, _ref, translatorExists, id, _ref2, translator;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.firstName || !req.body.lastName)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Please, provide first and last name of a translator."
              }));

            case 2:
              searchQuery = "SELECT *\n        FROM translators\n        WHERE \n            LOWER(first_name)='".concat(req.body.firstName.toLowerCase(), "'\n        AND\n            LOWER(last_name)='").concat(req.body.lastName.toLowerCase(), "'");
              addQuery = "INSERT INTO\n        translators(first_name, last_name)\n        VALUES($1, $2)\n        RETURNING *";
              values = [req.body.firstName, req.body.lastName];
              _context.prev = 5;
              _context.next = 8;
              return _index["default"].query(searchQuery);

            case 8:
              _ref = _context.sent;
              translatorExists = _ref.rows;

              if (!translatorExists[0]) {
                _context.next = 13;
                break;
              }

              id = translatorExists[0].translator_id;
              return _context.abrupt("return", res.status(400).send({
                "message": "Translator with that name already exists in the database with an id of: ".concat(id, ".")
              }));

            case 13:
              _context.next = 15;
              return _index["default"].query(addQuery, values);

            case 15:
              _ref2 = _context.sent;
              translator = _ref2.rows;

              if (translator[0]) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Unable to add a translator."
              }));

            case 19:
              return _context.abrupt("return", res.status(200).send(translator[0]));

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
      var query, _ref3, removedTranslator;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (req.body.translatorId) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                "message": "Please, provide id of the translator to remove."
              }));

            case 2:
              query = "DELETE FROM translators\n        WHERE translator_id = ".concat(req.body.translatorId, "\n        RETURNING *");
              _context2.prev = 3;
              _context2.next = 6;
              return _index["default"].query(query);

            case 6:
              _ref3 = _context2.sent;
              removedTranslator = _ref3.rows;

              if (removedTranslator[0]) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                "message": "Unable to find translator with id of: ".concat(req.body.translatorId)
              }));

            case 10:
              return _context2.abrupt("return", res.status(200).send({
                "message": "Translator has been deleted."
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
      var updateQuery, _ref4, translator;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!req.body.translatorId || !req.body.firstName || !req.body.lastName)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).send({
                "message": "Please, provide translator's data."
              }));

            case 2:
              updateQuery = "UPDATE translators\n        SET first_name = '".concat(req.body.firstName, "',\n            last_name = '").concat(req.body.lastName, "'\n        WHERE translator_id = ").concat(req.body.translatorId, "\n        RETURNING *");
              _context3.prev = 3;
              _context3.next = 6;
              return _index["default"].query(updateQuery);

            case 6:
              _ref4 = _context3.sent;
              translator = _ref4.rows;

              if (translator[0]) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                "message": "Unable to find the translator."
              }));

            case 10:
              return _context3.abrupt("return", res.status(200).send({
                "message": "Translator has been updated."
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
      var translatorsQuery, _ref5, translators;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              translatorsQuery = 'SELECT * FROM translators';
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(translatorsQuery);

            case 4:
              _ref5 = _context4.sent;
              translators = _ref5.rows;
              return _context4.abrupt("return", res.status(200).send(translators));

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
var _default = Translators;
exports["default"] = _default;