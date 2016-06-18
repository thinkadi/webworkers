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

app.get("/:id", function (req, res) {
    if (!items[req.params.id]) {
        res.status(status.NOT_FOUND).send("Item not found");
    } else {
        res.status(status.OK).send(items[req.params.id]);
    }
});

app.put("/:id", bodyParser, function (req, res) {
    if (isNaN(req.params.id)) {
        res.status(status.INTERNAL_SERVER_ERROR).send("Invalid item id");
    } else if (!items[req.params.id]) {
        res.status(status.NOT_FOUND).send("Item not found");
    } else {
        items[req.params.id] = req.body;
        res.status(status.OK).send();
    }
    res.send();
});

app.listen(3000, function () {
    console.log("Listening!");
});