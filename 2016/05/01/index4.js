var fs = require('fs');

fs.readFile("./files/welcome.txt", function (err, data) {
    if (err) {
        console.log("File Read Error");
    } else {
        console.log(data.toString());
    }
});