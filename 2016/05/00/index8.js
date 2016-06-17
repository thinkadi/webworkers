var list = [1, 3, 5, 21];

var displaySomething = function (something) {
    console.log(something);
}

console.log("Callback with Expressed Function");

list.forEach(displaySomething);