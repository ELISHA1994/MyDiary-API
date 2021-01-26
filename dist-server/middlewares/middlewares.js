"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  handleError: handleError,
  notFound: notFound
};
exports["default"] = _default;

function handleError(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({
    error: 'Internal Server Error'
  });
}

function notFound(req, res, next) {
  res.status(404).json({
    error: 'Not Found'
  });
}