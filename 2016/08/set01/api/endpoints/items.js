var express = require('express');
var status = require('http-status');
var passport = require('passport');
var bodyParser = require('body-parser').json();
var ObjectID = require('mongodb').ObjectID

module.exports = function (collections) {
    var itemsEndpoint = express.Router();
    var itemsColl = collections.itemsColl;
    
    itemsEndpoint.get("/", function (req, res) {
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

    itemsEndpoint.post("/", bodyParser, function (req, res) {
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

    itemsEndpoint.get("/:id", function (req, res) {
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

    itemsEndpoint.put("/:id", bodyParser, function (req, res) {
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

    itemsEndpoint.delete("/:id", bodyParser, function (req, res) {
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

    return itemsEndpoint;
}