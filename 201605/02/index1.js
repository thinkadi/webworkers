var http = require("http");
var items = [];
var server = http.createServer(function (req, res) {
    switch (req.method) {
    case "GET":
        var body = JSON.stringify(items);
        res.setHeader("Content-Length", Buffer.byteLength(body));
        res.setHeader("Content-Type", "application/json");
        res.end(body);
        break;
    }
});
server.listen(3000, function () {
    console.log("Listening on 3000")
});