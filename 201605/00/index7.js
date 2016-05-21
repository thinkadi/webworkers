var list = [1, 3, 5, 21];

function displaySomething(something) {
    console.log(something);
}

console.log("Callback with Declared Function");

list.forEach(displaySomething);