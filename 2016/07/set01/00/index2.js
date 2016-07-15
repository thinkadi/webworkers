var express = require('express');
var status = require('http-status');
var bodyParser = require('body-parser').json();
var MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var uuid = require('uuid');

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

app.post("/auth/bearer-token", bodyParser, function (req, res) {
    var user = req.body;
    if (!user.email) {
        res.status(status.BAD_REQUEST).send("Email cannot be blank");
    } else if (!user.password) {
        res.status(status.BAD_REQUEST).send("Password cannot be blank");
    } else {
        usersColl.findOne({
            "email": user.email,
            "password": user.password
        }, function (err, doc) {
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send();
            } else if (!doc) {
                res.status(status.NOT_FOUND).send("Cannot find this Email/Password combination");
            } else {

                var bearerToken = uuid.v4();

                usersColl.updateOne(doc, {
                    "$set": {
                        "bearerToken": bearerToken
                    }
                }, function (err) {
                    if (err) {
                        res.status(status.INTERNAL_SERVER_ERROR).send();
                    } else {
                        var returnDoc = {};
                        returnDoc.bearerToken = bearerToken;
                        res.status(status.CREATED).send(returnDoc);
                    }
                });
            }
        });
    }
});

app.listen(3000, function () {
    console.log("Listening!");
});