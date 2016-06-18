var canadianDollar = 0.91;

function roundTwoDecimals(amount) {
    return Math.round(amount * 100) / 100;
}

function canadianToUS(canadian) {
    return roundTwoDecimals(canadian * canadianDollar);
}

function uSToCanadian(us) {
    return roundTwoDecimals(us / canadianDollar);
}

console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(canadianToUS(50));