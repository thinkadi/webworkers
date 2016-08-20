var express = require('express');
var status = require('http-status');
var passport = require('passport');

module.exports = function (collections) {
    var usersEndpoint = express.Router();
    var usersColl = collections.usersColl;

    usersEndpoint.get("/", function (req, res) {
        usersColl.find({}, {
            "_id": 0,
            "email": 1,
            "name": 1
        }).toArray(function (err, docs) {
            res.status(status.OK).send(docs);
        });
    });

    usersEndpoint.get("/me", passport.authenticate('bearer', {
        session: false
    }), function (req, res) {
        usersColl.findOne({
            "_id": req.user._id
        }, {
            "_id": 0,
            "email": 1,
            "name": 1
        }, function (err, doc) {
            res.status(status.OK).send(doc);
        });
    });

    /*
    
    WRITE THE CODE HERE FOR A USER TO BE ABLE TO MODIFY HIS OR HER PROFILE INFORMATION. NOTE ONE USER SHOULD NOT BE ABLE TO VIEW OR MODIFY ANOTHER USER'S PROFILE INFORMATION.
    
    */

    return usersEndpoint;
};