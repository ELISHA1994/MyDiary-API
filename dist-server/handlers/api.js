"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _entries = _interopRequireDefault(require("../models/entries"));

var _autoCatch = _interopRequireDefault(require("../lib/auto-catch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('uuid'),
    uuidv4 = _require.v4;

var _default = (0, _autoCatch["default"])({
  listEntries: listEntries,
  getEntries: getEntries,
  createEntries: createEntries,
  updateEntries: updateEntries,
  deleteEntries: deleteEntries
});

exports["default"] = _default;

function listEntries(_x, _x2) {
  return _listEntries.apply(this, arguments);
}

function _listEntries() {
  _listEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$offset, offset, _req$query$limit, limit, tag, entries;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$offset = _req$query.offset, offset = _req$query$offset === void 0 ? 0 : _req$query$offset, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 25 : _req$query$limit, tag = _req$query.tag;
            _context.next = 3;
            return _entries["default"].list({
              offset: Number(offset),
              limit: Number(limit),
              tag: tag
            });

          case 3:
            entries = _context.sent;
            res.json(entries);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _listEntries.apply(this, arguments);
}

function getEntries(_x3, _x4, _x5) {
  return _getEntries.apply(this, arguments);
} // Entries - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none


function _getEntries() {
  _getEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id, entry;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _entries["default"].get(id);

          case 3:
            entry = _context2.sent;

            if (entry) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", next());

          case 6:
            res.json(entry);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getEntries.apply(this, arguments);
}

function createEntries(_x6, _x7, _x8) {
  return _createEntries.apply(this, arguments);
}

function _createEntries() {
  _createEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var _req$body, title, description, fields, entry;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description;
            fields = {};
            fields.id = uuidv4();
            fields.title = title;
            fields.description = description;
            fields.timestamp = Date.now();
            _context3.next = 8;
            return _entries["default"].create(fields);

          case 8:
            entry = _context3.sent;
            res.json(entry);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _createEntries.apply(this, arguments);
}

function updateEntries(_x9, _x10, _x11) {
  return _updateEntries.apply(this, arguments);
}

function _updateEntries() {
  _updateEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var id, data, entry;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            data = req.body;
            data.timestamp = Date.now();
            _context4.next = 5;
            return _entries["default"].edit(id, data);

          case 5:
            entry = _context4.sent;
            res.json(entry);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _updateEntries.apply(this, arguments);
}

function deleteEntries(_x12, _x13, _x14) {
  return _deleteEntries.apply(this, arguments);
}

function _deleteEntries() {
  _deleteEntries = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _entries["default"].destroy(id);

          case 3:
            result = _context5.sent;
            res.json(result);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _deleteEntries.apply(this, arguments);
}