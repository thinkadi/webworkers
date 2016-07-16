var MongoClient = require('mongodb').MongoClient;

module.exports = function (cb) {
    var mongodbUrl = "mongodb://localhost:27017/shoppinglist"
    var db;
    var collections = {};
    MongoClient.connect(mongodbUrl, function (err, mongodb) {
        if (err) {
            console.log("Error connecting to DB server.");
        } else {
            db = mongodb;
            collections.usersColl = db.collection('users');
            collections.itemsColl = db.collection('items');

            cb(collections);
        }
    });
}