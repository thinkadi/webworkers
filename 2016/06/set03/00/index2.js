var items = [];

var express = require('express');
var app = express();
var status = require('http-status');
var bodyParser = require('body-parser').text();

app.get("/", function (req, res) {
    res.status(status.OK).send(items);
});

app.post("/", bodyParser, function (req, res) {
    items.push(req.body);
    res.status(status.CREATED).send();
});

app.listen(3000, function () {
    console.log("Listening!");
});