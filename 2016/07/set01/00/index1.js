var express = require('express');
var status = require('http-status');
var bodyParser = require('body-parser').json();
var MongoClient = require('mongodb').MongoClient;

var mongodbUrl = "mongodb://localhost:27017/shoppinglist"

var db;
var usersColl;

MongoClient.connect(mongodbUrl, function (err, mongodb) {
    if (err) {
        console.log("Error connecting to DB server.");
    } else {
        db = mongodb;
        usersColl = db.collection('users');
    }
});

var app = express();

app.post("/auth/register", bodyParser, function (req, res) {
    var user = req.body;
    if (!user.email) {
        res.status(status.BAD_REQUEST).send("Email cannot be blank");
    } else if (!user.password) {
        res.status(status.BAD_REQUEST).send("Password cannot be blank");
    } else if (!user.name) {
        res.status(status.BAD_REQUEST).send("Missing Name Object");
    } else if (!user.name.first) {
        res.status(status.BAD_REQUEST).send("First Name cannot be blank");
    } else if (!user.name.last) {
        res.status(status.BAD_REQUEST).send("Last Name cannot be blank");
    } else {
        usersColl.insertOne(req.body, function (err) {
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send();
            } else {
                res.status(status.CREATED).send();
            }
        });
    }
});

app.listen(3000, function () {
    console.log("Listening!");
});


/*
{
    "email":"email@email.com",
    "password":"password",
    "name":{
        "first":"First",
        "last":"Name"
    }
}
*/

// Please create a unique index on "email" in your collection.