"use strict";

var express = require('express');

var app = express();
var PORT = 3000;
var auto = ['azul', 'negro', 'amarillo', 'rojo']; // Route

app.get('/', function (req, res) {
  auto.map(function (d) {
    console.log(d);
  });
  res.json({
    msg: 'Welcome to upload file'
  });
});
app.listen(PORT, function () {
  console.log("App listening on port ".concat(PORT));
});
//# sourceMappingURL=app.js.map