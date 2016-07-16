var express = require('express');
var status = require('http-status');
var bodyParser = require('body-parser').json();
var MongoClient = require('mongodb').MongoClient;
var uuid = require('uuid');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var ObjectID = require('mongodb').ObjectID

var mongodbUrl = "mongodb://localhost:27017/shoppinglist"

var db;
var usersColl;

MongoClient.connect(mongodbUrl, function (err, mongodb) {
    if (err) {
        console.log("Error connecting to DB server.");
    } else {
        db = mongodb;
        usersColl = db.collection('users');
        itemsColl = db.collection('items');
    }
});

passport.use(new BearerStrategy(function (token, done) {
    usersColl.findOne({
            "bearerToken.token": token,
            "bearerToken.expiry": {
                "$gt": new Date()
            }
        },
        function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            return done(null, user, {
                scope: 'all'
            });
        });
}));

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
                var bearerToken = {};
                bearerToken.token = uuid.v4();
                bearerToken.generated = new Date();
                bearerToken.validityInSeconds = 3600;
                bearerToken.expiry = new Date();
                bearerToken.expiry.setSeconds(bearerToken.expiry.getSeconds() + bearerToken.validityInSeconds);
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

app.get("/auth/bearer-token-test", passport.authenticate('bearer', {
        session: false
    }),
    function (req, res) {
        res.send("Your Bearer Token is valid. Your email address in the system is: " + req.user.email);
    });

app.get("/items", passport.authenticate('bearer', {
    session: false
}), function (req, res) {
    itemsColl.find({
        "user": req.user._id
    }, {
        "name": 1,
        "quantity": 1,
        "store": 1
    }).toArray(function (err, docs) {
        var returnDocs = [];
        for (i = 0; i < docs.length; i++) {
            var returnDoc = {};
            returnDoc.id = docs[i]._id;
            returnDoc.name = docs[i].name;
            returnDoc.quantity = docs[i].quantity;
            returnDoc.store = docs[i].store;
            returnDocs.push(returnDoc);
        }
        res.status(status.OK).send(returnDocs);
    });
});

app.post("/items", passport.authenticate('bearer', {
    session: false
}), bodyParser, function (req, res) {

    var item = {};
    item.name = req.body.name;
    item.quantity = req.body.quantity;
    item.store = req.body.store;
    item.user = req.user._id;

    if (!item.name) {
        res.status(status.BAD_REQUEST).send("Name cannot be blank");
    } else if (!item.quantity) {
        res.status(status.BAD_REQUEST).send("Quantity cannot be blank");
    } else if (!item.store) {
        res.status(status.BAD_REQUEST).send("Store cannot be blank");
    } else {
        itemsColl.insertOne(item, function (err, result) {
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send();
            } else {
                var returnDoc = {};
                returnDoc.id = result.insertedId;
                res.status(status.CREATED).send(returnDoc);
            }
        });
    }
});

app.get("/items/:id", passport.authenticate('bearer', {
    session: false
}), function (req, res) {
    itemsColl.findOne({
        "_id": new ObjectID(req.params.id)
    }, function (err, doc) {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).send();
        } else if (!doc) {
            res.status(status.NOT_FOUND).send("Item not found");
        } else if (!doc.user.equals(req.user._id)) {
            res.status(status.FORBIDDEN).send("You are forbidden from viewing this item");
        } else {
            var returnDoc = {};
            returnDoc.id = doc._id;
            returnDoc.name = doc.name;
            returnDoc.quantity = doc.quantity;
            returnDoc.store = doc.store;
            res.status(status.OK).send(returnDoc);
        }
    });
});

app.put("/items/:id", passport.authenticate('bearer', {
    session: false
}), bodyParser, function (req, res) {
    itemsColl.findOne({
        "_id": new ObjectID(req.params.id)
    }, function (err, doc) {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).send();
        } else if (!doc) {
            res.status(status.NOT_FOUND).send("Item not found");
        } else if (!doc.user.equals(req.user._id)) {
            res.status(status.FORBIDDEN).send("You are forbidden from editing this item");
        } else {
            var newDoc = doc;
            newDoc.name = req.body.name;
            newDoc.quantity = req.body.quantity;
            newDoc.store = req.body.store;
            if (!newDoc.name) {
                res.status(status.BAD_REQUEST).send("Name cannot be blank");
            } else if (!newDoc.quantity) {
                res.status(status.BAD_REQUEST).send("Quantity cannot be blank");
            } else if (!newDoc.store) {
                res.status(status.BAD_REQUEST).send("Store cannot be blank");
            } else {
                itemsColl.updateOne({
                    "_id": new ObjectID(req.params.id)
                }, newDoc, function (err) {
                    if (err) {
                        res.status(status.INTERNAL_SERVER_ERROR).send();
                    } else {
                        res.status(status.OK).send();
                    }
                });
            }
        }
    });
});

app.delete("/items/:id", passport.authenticate('bearer', {
    session: false
}), bodyParser, function (req, res) {
    itemsColl.findOne({
        "_id": new ObjectID(req.params.id)
    }, function (err, doc) {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).send();
        } else if (!doc) {
            res.status(status.NOT_FOUND).send("Item not found");
        } else if (!doc.user.equals(req.user._id)) {
            res.status(status.FORBIDDEN).send("You are forbidden from deleting this item");
        } else {
            itemsColl.removeOne({
                "_id": new ObjectID(req.params.id)
            }, function (err) {
                if (err) {
                    res.status(status.INTERNAL_SERVER_ERROR).send();
                } else {
                    res.status(status.NO_CONTENT).send();
                }
            });
        }
    });
});

app.listen(3000, function () {
    console.log("Listening!");
});

/* Use Bearer Token

Request Header:
Authorization: Bearer [Token Here]

*/