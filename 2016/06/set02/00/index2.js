var moment = require('moment');

var jfkMoment = moment("1963-11-22 12:30");

console.log("Shots were heard by bystanders in Dealey Plaza on " + jfkMoment.format("MMMM Do, YYYY") + " at " + jfkMoment.format("hh:mm A") + ".");