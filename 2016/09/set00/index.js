var express = require('express');

var db = require('./db/db.js');
var auth = require('./auth/auth.js');
var api = require('./api/api.js');

var usersColl;
db(function (collections) {
    var app = express();
    app.use("/auth", auth(collections));
    app.use("/api", api(collections));
    app.use(express.static('public'));
    app.listen(3000, function () {
        console.log("Listening!");
    });
});