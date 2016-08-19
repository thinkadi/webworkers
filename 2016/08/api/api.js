var express = require('express');
var passport = require('passport');

var itemsEndpoint = require('./endpoints/items.js');
var usersEndpoint = require('./endpoints/users.js');

module.exports = function (collections) {
    var api = express.Router();
    api.use("/items", passport.authenticate('bearer', {
        session: false
    }), itemsEndpoint(collections));
    api.use("/users", usersEndpoint(collections));
    return api;
};