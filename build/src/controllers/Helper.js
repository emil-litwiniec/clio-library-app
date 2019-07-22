"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _isEmail = _interopRequireDefault(require("validator/lib/isEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Helper = {
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt["default"].compareSync(password, hashPassword);
  },
  isValidEmail: function isValidEmail(email) {
    return (0, _isEmail["default"])(email);
  },
  generateToken: function generateToken(id) {
    var isAdmin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var firstName = arguments.length > 2 ? arguments[2] : undefined;
    var lastName = arguments.length > 3 ? arguments[3] : undefined;

    var token = _jsonwebtoken["default"].sign({
      userId: id,
      admin: isAdmin,
      firstName: firstName,
      lastName: lastName
    }, process.env.SECRET, {
      expiresIn: "7d"
    });

    return token;
  }
};
var _default = Helper;
exports["default"] = _default;