 var express = require('express');
 var status = require('http-status');
 var MongoClient = require('mongodb').MongoClient;

 var mongodbUrl = "mongodb://localhost:27017/shopping"

 var db;
 var itemsColl;

 MongoClient.connect(mongodbUrl, function (err, mongodb) {
     if (err) {
         console.log("Error connecting to DB server.");
     } else {
         db = mongodb;
         itemsColl = db.collection('items');
     }
 });

 var app = express();

 app.get("/", function (req, res) {
     itemsColl.find({}).toArray(function (err, docs) {
         res.status(status.OK).send(docs);
     });
 });

 app.listen(3000, function () {
     console.log("Listening!");
 });