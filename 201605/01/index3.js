var fs = require('fs');

fs.readFile("./message1.txt", function (err, data) {
    if (err) {
        console.log("File Read Error");
    } else {
        console.log(data.toString());
    }
});