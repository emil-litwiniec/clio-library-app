"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var utils = {
  setQueries: function setQueries(dbColumns, newValues) {
    return dbColumns.map(function (el, idx) {
      return "".concat(el, " = ").concat(newValues[idx]);
    });
  },
  setColumnsNames: function setColumnsNames(req, cb) {
    var keys = Object.keys(req.body);
    var newKeys = keys.map(function (el) {
      return cb(el);
    });
    var result = newKeys.filter(function (el) {
      return el !== undefined;
    }); // console.log('results: ', result)

    return result;
  },
  setColumnsNamesFromEntries: function setColumnsNamesFromEntries(entries, cb) {
    var newEntries = entries.map(function (entry) {
      return [cb(entry[0]), "'".concat(entry[1], "'")];
    });
    return newEntries;
  },
  setBooksValuesNames: function setBooksValuesNames(req) {
    var reqValues = Object.values(req.body);
    var reqKeys = Objecy.values; // console.log('obj keys:', Object.keys(req.body));
    // console.log('obj values:', Object.values(req.body))
    // const values = [
    //     req.body.title ? `'${req.body.title}'` : undefined,
    //     req.body.authorId ? `'${req.body.authorId}'` : undefined,
    //     req.body.pubYear ? `'${req.body.pubYear}'` : undefined,
    //     req.body.series ? `'${req.body.series}'` : undefined,
    //     req.body.edition ? `'${req.body.edition}'` : undefined,
    //     req.body.genreId ? `'${req.body.genreId}'`: undefined,
    //     req.body.keywords ? `'${req.body.keywords}'` : undefined,
    //     req.body.ukd  ? `${req.body.ukd}` : undefined,
    //     req.body.lang ?`'${req.body.lang}'` : undefined,
    //     req.body.translatorId ? `'${req.body.translatorId}'` : undefined,
    //     req.body.pubId ? `'${req.body.pubId}'` : undefined,
    //     req.body.isbn ? `'${req.body.isbn}'` : undefined
    // ];
    // console.log(req.body);

    var result = values.filter(function (el) {
      return el !== undefined;
    }); // console.log('setValues: ', result);

    return result;
  },
  setPublishersValuesNames: function setPublishersValuesNames(req) {
    var values = [req.body.name ? "'".concat(req.body.name, "'") : undefined, req.body.estYear || undefined, req.body.address ? "'".concat(req.body.address, "'") : undefined, req.body.origin ? "'".concat(req.body.origin.toUpperCase(), "'") : undefined];
    var result = values.filter(function (el) {
      return el !== undefined;
    });
    return result;
  }
};
var _default = utils;
exports["default"] = _default;