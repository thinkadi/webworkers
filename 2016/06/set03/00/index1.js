var items = ["eggs", "broccoli", "fish", "chicken"];

var express = require('express');
var app = express();

app.get("/", function (req, res) {
    res.send(items);
});

app.listen(3000, function () {
    console.log("Listening!");
});