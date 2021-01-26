"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _middlewares = _interopRequireDefault(require("./middlewares/middlewares"));

var _api = _interopRequireDefault(require("./handlers/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cors = require('cors');

var bodyParser = require('body-parser');

var port = process.env.NODE_ENV === 'test' ? '1337' : process.env.PORT || '3000'; // app instance

var app = (0, _express["default"])(); // middlewares

app.use((0, _morgan["default"])('dev'));
app.use(cors());
app.use(_express["default"].json());
app.use(bodyParser.json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // App routes

app.post('/api/v1/entries', _api["default"].createEntries);
app.get('/api/v1/entries', _api["default"].listEntries);
app.get('/api/v1/entries/:id', _api["default"].getEntries);
app.put('/api/v1/entries/:id', _api["default"].updateEntries);
app["delete"]('/api/v1/entries/:id', _api["default"].deleteEntries);
app.use(_middlewares["default"].handleError);
app.use(_middlewares["default"].notFound);
app.listen(port, function () {
  return console.log("Server listening on port ".concat(port));
});
var _default = app;
exports["default"] = _default;