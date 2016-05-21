var http = require("http");
var url = require("url");
var server = http.createServer(function (req, res) {
    var items = [];
    switch (req.method) {
    case "GET":
        var path = url.parse(req.url).pathname;
        var i = parseInt(path.slice(1), 10);
        if (isNaN(i)) {
            var body = JSON.stringify(items);
            res.setHeader("Content-Length", Buffer.byteLength(body));
            res.setHeader("Content-Type", "application/json");
            res.end(body);
        } else if (!items[i]) {
            res.statusCode = 404;
            res.end("Item not found");
        } else {
            var body = items[i];
            res.setHeader("Content-Length", Buffer.byteLength(body));
            res.setHeader("Content-Type", "text/plain");
            res.end(body);
        }
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
    console.log("Listening on 3000")
});