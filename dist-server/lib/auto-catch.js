"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = autoCatch;

function autoCatch(handlers) {
  return Object.keys(handlers).reduce(function (autoHandlers, key) {
    var handler = handlers[key];

    autoHandlers[key] = function (req, res, next) {
      return Promise.resolve(handler(req, res, next))["catch"](next);
    };

    return autoHandlers;
  }, {});
}