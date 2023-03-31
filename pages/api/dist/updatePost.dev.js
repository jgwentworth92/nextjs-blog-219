"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.config = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _nextConnect = _interopRequireDefault(require("next-connect"));

var _formidable = _interopRequireDefault(require("formidable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var handler = (0, _nextConnect["default"])();
handler.post(function _callee2(req, res) {
  var form;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          form = new _formidable["default"].IncomingForm();
          form.parse(req, function _callee(err, fields, files) {
            var id, title, excerpt, description, tags, date, postData, filePath, image, imagePath;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!err) {
                      _context.next = 3;
                      break;
                    }

                    res.status(500).json({
                      message: "Error parsing form data",
                      error: err
                    });
                    return _context.abrupt("return");

                  case 3:
                    id = fields.id, title = fields.title, excerpt = fields.excerpt, description = fields.description, tags = fields.tags;
                    date = new Date().toISOString().slice(0, 10);
                    postData = "---\nid: ".concat(id, "\ntitle: '").concat(title, "'\ndate: '").concat(date, "'\nexcerpt: '").concat(excerpt, "'\nhero_image: '/").concat(id, ".jpg'\ntags: ").concat(JSON.stringify(tags), "\n---\n\n").concat(description, "\n");
                    filePath = _path["default"].join(process.cwd(), "posts", "".concat(id, ".md"));

                    try {
                      _fs["default"].writeFileSync(filePath, postData);

                      if (files.image) {
                        image = files.image;
                        imagePath = _path["default"].join(process.cwd(), "/public", "".concat(id, ".jpg"));

                        _fs["default"].renameSync(image.filepath, imagePath);
                      }

                      res.status(200).json({
                        message: "Post updated successfully"
                      });
                    } catch (error) {
                      res.status(500).json({
                        message: "Failed to update post",
                        error: error
                      });
                    }

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var config = {
  api: {
    bodyParser: false
  }
};
exports.config = config;
var _default = handler;
exports["default"] = _default;