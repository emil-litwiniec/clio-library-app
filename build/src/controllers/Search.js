"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../db/index"));

var _searchQueries = require("../utils/searchQueries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Search = {
  search: function () {
    var _search = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var params, yearRange, areYears, hasCols, whereClause, orderQuery, yearRangeClauseFn, query, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = req.query;

              if (!(Object.entries(params).length == 0)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                "message": "Enter at least one value to search"
              }));

            case 3:
              // build yearRange object depending on available query string parameters
              yearRange = {};
              Object.entries(params).forEach(function (el) {
                if (el[0] === 'yearStart') {
                  yearRange.yearStart = el[1];
                } else if (el[0] === 'yearEnd') {
                  yearRange.yearEnd = el[1];
                }
              }); // check query string for specific parameters

              areYears = Object.keys(yearRange).length === 0 ? false : true;
              hasCols = Object.keys(params).includes('col');
              whereClause = hasCols ? _searchQueries.queryFormat.whereClause(params.col, params.value, params.query) : '';
              orderQuery = params.order ? _searchQueries.queryFormat.orderBy(params.order) : ''; // check if years data is supplied and if it's not searching in authors - 'a'

              yearRangeClauseFn = function yearRangeClauseFn() {
                if (areYears) {
                  if (params.query === 'a') {
                    return '';
                  } else {
                    return _searchQueries.queryFormat.yearRange(yearRange, hasCols);
                  }
                }

                return '';
              };

              query = _searchQueries.searchQueries.select(params.query) + whereClause + yearRangeClauseFn() + orderQuery;
              console.log('Search.js query: ', query);
              _context.prev = 12;
              _context.next = 15;
              return _index["default"].query(query);

            case 15:
              _ref = _context.sent;
              rows = _ref.rows;
              console.log(rows);

              if (rows[0]) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                "message": "Book not found"
              }));

            case 20:
              return _context.abrupt("return", res.status(200).send(rows));

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](12);
              return _context.abrupt("return", res.status(400).send({
                "message": "something went wrong with search"
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 23]]);
    }));

    function search(_x, _x2) {
      return _search.apply(this, arguments);
    }

    return search;
  }()
};
var _default = Search;
exports["default"] = _default;