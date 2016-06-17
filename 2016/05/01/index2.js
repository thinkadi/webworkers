var fs = require('fs');

fs.readFile("./message.txt", function (err, data) {
    console.log(data.toString());
});