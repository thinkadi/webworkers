var fs = require('fs');

fs.readFile("./message.txt", function (err, data) {
    if (err) {
        console.log("File Read Error");
    } else {
        console.log(data.toString());
    }
})