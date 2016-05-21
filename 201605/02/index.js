var fs = require('fs');

var list = ["Hello Synchronous World!"]
list.forEach(function (v) {
    console.log(v);
});
console.log("Sync Marker");


fs.readFile("message.txt", function (err, data) {
    console.log(data.toString());
});
console.log("Async Marker");