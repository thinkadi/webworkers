var http = require("http");
var server = http.createServer(function (req, res) {
    var items = ["eggs", "broccoli", "fish", "chicken"];
    var body = JSON.stringify(items);
    res.setHeader("Content-Length", Buffer.byteLength(body));
    res.setHeader("Content-Type", "application/json");
    res.end(body);
});
server.listen(3000, function () {
    console.log("Listening on 3000")
});