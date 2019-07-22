"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

require("@babel/polyfill");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _compression = _interopRequireDefault(require("compression"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

var _User = _interopRequireDefault(require("./src/controllers/User"));

var _Auth = _interopRequireDefault(require("./src/middleware/Auth"));

var _Search = _interopRequireDefault(require("./src/controllers/Search"));

var _Books = _interopRequireDefault(require("./src/controllers/Books"));

var _Authors = _interopRequireDefault(require("./src/controllers/Authors"));

var _Borrows = _interopRequireDefault(require("./src/controllers/Borrows"));

var _Genres = _interopRequireDefault(require("./src/controllers/Genres"));

var _Publishers = _interopRequireDefault(require("./src/controllers/Publishers"));

var _Translators = _interopRequireDefault(require("./src/controllers/Translators"));

var _Reservations = _interopRequireDefault(require("./src/controllers/Reservations"));

var _Filters = _interopRequireDefault(require("./src/controllers/Filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
var PORT = process.env.PORT || 5000; // app.use(compression());

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "..", '/client/public')));
app.get('/api/search', _Search["default"].search);
app.put('/api/createUser', _User["default"].create);
app.get('/api/user/getData', _User["default"].getData);
app.patch('/api/updateUser', _User["default"].update);
app.get("/api/getUser", _User["default"].getUser);
app.put('/api/admin/addBook', _Books["default"].insert);
app["delete"]('/api/admin/removeBook', _Books["default"].remove);
app.patch('/api/admin/updateBook', _Books["default"].update);
app.post('/api/getBook', _Books["default"].getBook);
app.get('/api/searchBookId', _Books["default"].searchBookId);
app.get('/api/searchAllBookId', _Books["default"].searchAllBookId);
app.put('/api/admin/addAuthor', _Authors["default"].insert);
app["delete"]('/api/admin/removeAuthor', _Authors["default"].remove);
app.patch('/api/admin/updateAuthor', _Authors["default"].update);
app.post('/api/getAuthor', _Authors["default"].getAuthor);
app.get('/api/getAllAuthors', _Authors["default"].getAllAuthors);
app.post('/api/getAuthorAndBooks', _Authors["default"].getAuthorAndBooks);
app.put('api/admin/addBorrow', _Borrows["default"].add);
app.patch('api/admin/returnBook', _Borrows["default"].bookReturn);
app["delete"]('api/admin/removeBorrow', _Borrows["default"].remove);
app.put('/api/admin/addGenre', _Genres["default"].add);
app["delete"]('/api/admin/removeGenre', _Genres["default"].remove);
app.patch('/api/admin/updateGenre', _Genres["default"].update);
app.get('/api/getAllGenres', _Genres["default"].getAll);
app.put('/api/admin/addPublisher', _Publishers["default"].add);
app["delete"]('/api/admin/removePublisher', _Publishers["default"].remove);
app.patch('/api/admin/updatePublisher', _Publishers["default"].update);
app.get('/api/getAllPubs', _Publishers["default"].getAll);
app.put('/api/admin/addTranslator', _Translators["default"].add);
app["delete"]('/api/admin/removeTranslator', _Translators["default"].remove);
app.patch('/api/admin/updateTranslator', _Translators["default"].update);
app.get('/api/getAllTranslators', _Translators["default"].getAll);
app.patch('/api/user/prolong', _Borrows["default"].prolong);
app.post('/api/user/addReservation', _Reservations["default"].add);
app["delete"]('/api/user/removeReservation', _Reservations["default"].remove);
app.get('/api/searchUsers', _User["default"].searchUsers);
app.get('/api/admin/filters', _Filters["default"].getAll);
app.post('/api/login', _User["default"].login);
app.post('/api/decodeToken', _Auth["default"].decodeToken);
app.get('/api/admin/', _Auth["default"].verifyAdminToken, function (req, res) {
  res.status(200).send({
    'message': "admin works"
  });
}); // check for outdated reservations every 6 hours

_nodeCron["default"].schedule('0 */6 * * *', function () {
  _Reservations["default"].removeOutdated();
});

app.get('*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../client/public/index.html'));
});
app.listen(PORT);
console.log('server is running on port', PORT);