var MongoClient = require('mongodb').MongoClient;

module.exports = function (cb) {
    var mongodbUrl = process.env.DB_PATH;
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