var http = require("http");
var server = http.createServer(function (req, res) {
    res.setHeader("Location", "http://www.google.com");
    res.statusCode = 302;
    res.end();
});
server.listen(3000, function () {
    console.log("Listening on 3000")
});