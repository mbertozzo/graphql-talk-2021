"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 5000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // API calls

app.get('/api/hello', function (req, res) {
  res.send({
    express: 'Hello From Express'
  });
});
app.post('/api/world', function (req, res) {
  console.log(req.body);
  res.send("I received your POST request. This is what you sent me: ".concat(req.body.post));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(_express["default"]["static"](_path["default"].join(__dirname, 'client/build'))); // Handle React routing, return all requests to React app

  app.get('*', function (req, res) {
    res.sendFile(_path["default"].join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, function () {
  return console.log("Listening on port ".concat(port));
});