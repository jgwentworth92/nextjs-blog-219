"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.config = void 0;

var formidable = require("formidable");

var path = require("path");

var fs = require("fs").promises;

var readFile = function readFile(req) {
  var saveLocally = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");

    options.filename = function (name, ext, reqPath, form) {
      return Date.now().toString() + "_" + reqPath.originalFilename;
    };
  }

  options.maxFileSize = 4000 * 1024 * 1024;
  var form = new formidable.IncomingForm(options);
  return new Promise(function (resolve, reject) {
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      resolve({
        fields: fields,
        files: files
      });
    });
  });
};

var config = {
  api: {
    bodyParser: false
  }
};
exports.config = config;

var handler = function handler(req, res) {
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fs.readdir(path.join(process.cwd() + "/public", "/images")));

        case 3:
          _context.next = 9;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          _context.next = 9;
          return regeneratorRuntime.awrap(fs.mkdir(path.join(process.cwd() + "/public", "/images")));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(readFile(req, true));

        case 11:
          res.json({
            done: "ok"
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var _default = handler;
exports["default"] = _default;