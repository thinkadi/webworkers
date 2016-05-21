var http = require("http");
var server = http.createServer(function (req, res) {
    var items = [];
    switch (req.method) {
    case "GET":
        var body = JSON.stringify(items);
        res.setHeader("Content-Length", Buffer.byteLength(body));
        res.setHeader("Content-Type", "application/json");
        res.end(body);
        break;
    case "POST":
        var item = "";
        req.setEncoding("utf8");
        req.on("data", function (chunk) {
            item += chunk;
        });
        req.on("end", function () {
            items.push(item);
            res.setHeader("Content-Type", "text/plain");
            res.statusCode = 201;
            res.end(item);
        });
        break;
    }
});
server.listen(3000, function () {
    console.log("Listening on 3000");
});