var fs = require('fs');

fs.readFile("./message1.txt", function (err, data) {
    console.log(data.toString());
});