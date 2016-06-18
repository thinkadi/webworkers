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
    res.status(status.OK).send();
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
        res.status(status.BAD_REQUEST).send("Invalid item id");
    } else if (!items[req.params.id]) {
        res.status(status.NOT_FOUND).send("Item not found");
    } else {
        items[req.params.id] = req.body;
        res.status(status.OK).send();
    }
    res.send();
});

app.delete("/:id", bodyParser, function (req, res) {
    if (isNaN(req.params.id)) {
        res.status(status.BAD_REQUEST).send("Invalid item id");
    } else if (!items[req.params.id]) {
        res.status(status.NOT_FOUND).send("Item not found");
    } else {
        items.splice(req.params.id, 1);
        res.status(status.NO_CONTENT).send();
    }
});

app.listen(3000, function () {
    console.log("Listening!");
});