var moment = require('moment');

var babyMoment = moment("2011-03-03 14:56");

console.log("The birth certificate says that the baby was born on " + babyMoment.format("MMMM Do, YYYY") + " at " + babyMoment.format("hh:mm A") + ".");