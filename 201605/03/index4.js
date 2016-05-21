var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    fs.readFile("index1.html", function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.end();
        } else {
            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.end(data);
        }
    });
});
server.listen(3000, function () {
    console.log("Listening on 3000")
});