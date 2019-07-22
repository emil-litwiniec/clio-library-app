"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Filters = {
  getAll: function () {
    var _getAll = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var genresQuery, authorsQuery, publishersQuery, translatorsQuery, _ref, _ref2, genres, authors, publishers, translators;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              genresQuery = 'SELECT * FROM genres';
              authorsQuery = "SELECT CONCAT(first_name, ' ', last_name) AS author,\n        author_id\n        FROM authors";
              publishersQuery = 'SELECT pub_id, name FROM publishers';
              translatorsQuery = "SELECT \n        CONCAT(first_name, ' ', last_name) AS translator, translator_id\n        FROM translators";
              _context.prev = 4;
              _context.next = 7;
              return Promise.all([_index["default"].query(genresQuery), _index["default"].query(authorsQuery), _index["default"].query(publishersQuery), _index["default"].query(translatorsQuery)]);

            case 7:
              _ref = _context.sent;
              _ref2 = _slicedToArray(_ref, 4);
              genres = _ref2[0].rows;
              authors = _ref2[1].rows;
              publishers = _ref2[2].rows;
              translators = _ref2[3].rows;
              return _context.abrupt("return", res.status(200).send({
                genres: genres,
                authors: authors,
                publishers: publishers,
                translators: translators
              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](4);
              return _context.abrupt("return", res.status(400).send(_context.t0));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 16]]);
    }));

    function getAll(_x, _x2) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }()
};
var _default = Filters;
exports["default"] = _default;