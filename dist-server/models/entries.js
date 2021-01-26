"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.list = list;
exports.get = get;
exports.edit = edit;
exports.destroy = destroy;
exports["default"] = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var helpers = require('../../helpers/helpers');

var _default = {
  // create,
  // list,
  // get,
  // edit,
  destroy: destroy
};
exports["default"] = _default;

function create(_x) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fields) {
    var idPT, titlePT, descriptionPT;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Check that all required field are filled out
            idPT = typeof fields.id === 'string' && fields.id.length > 0;
            titlePT = typeof fields.title === 'string' && fields.title.length > 0;
            descriptionPT = typeof fields.description === 'string' && fields.description.length > 0;

            if (!(idPT && titlePT && descriptionPT)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return helpers.write('entries', 'entries.json', fields);

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            return _context2.abrupt("return", {
              error: 'Missing required fields'
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _create.apply(this, arguments);
}

function list() {
  return _list.apply(this, arguments);
}

function _list() {
  _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var opts,
        _opts$offset,
        offset,
        _opts$limit,
        limit,
        tag,
        data,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            opts = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
            _opts$offset = opts.offset, offset = _opts$offset === void 0 ? 0 : _opts$offset, _opts$limit = opts.limit, limit = _opts$limit === void 0 ? 25 : _opts$limit, tag = opts.tag;
            _context3.next = 4;
            return helpers.read('entries', 'entries.json');

          case 4:
            data = _context3.sent;
            return _context3.abrupt("return", JSON.parse(data).filter(function (p, i) {
              return !tag || p.tags.indexOf(tag) >= 0;
            }).slice(offset, offset + limit));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _list.apply(this, arguments);
}

function get(_x2) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
    var data, entries, i;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return helpers.read('entries', 'entries.json');

          case 2:
            data = _context4.sent;
            entries = JSON.parse(data); // console.log(entries)

            i = 0;

          case 5:
            if (!(i < entries.length)) {
              _context4.next = 11;
              break;
            }

            if (!(entries[i].id === id)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", entries[i]);

          case 8:
            i++;
            _context4.next = 5;
            break;

          case 11:
            return _context4.abrupt("return", null);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _get.apply(this, arguments);
}

function edit(_x3, _x4) {
  return _edit.apply(this, arguments);
}

function _edit() {
  _edit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, change) {
    var entry;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return helpers.update('entries', 'entries.json', change, id);

          case 2:
            entry = _context5.sent;
            return _context5.abrupt("return", entry);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _edit.apply(this, arguments);
}

function destroy(_x5) {
  return _destroy.apply(this, arguments);
}

function _destroy() {
  _destroy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
    var check;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getEntry(id);

          case 2:
            check = _context6.sent;

            if (!check) {
              _context6.next = 7;
              break;
            }

            _context6.next = 6;
            return helpers["delete"]('entries', 'entries.json', id);

          case 6:
            return _context6.abrupt("return", {
              message: 'Entry deleted'
            });

          case 7:
            return _context6.abrupt("return", {
              message: 'Entry does not exist in file'
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _destroy.apply(this, arguments);
}

var getEntry = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
    var data, entries, i;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return helpers.read('entries', 'entries.json');

          case 2:
            data = _context.sent;
            entries = JSON.parse(data);

            if (!(entries.length > 0)) {
              _context.next = 12;
              break;
            }

            i = 0;

          case 6:
            if (!(i < entries.length)) {
              _context.next = 12;
              break;
            }

            if (!(entries[i].id === id)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", true);

          case 9:
            i++;
            _context.next = 6;
            break;

          case 12:
            return _context.abrupt("return", null);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEntry(_x6) {
    return _ref.apply(this, arguments);
  };
}();