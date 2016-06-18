var canadianDollar = 0.91;

function roundTwoDecimals(amount) {
    return Math.round(amount * 100) / 100;
}

module.exports.canadianToUS = function (canadian) {
    return roundTwoDecimals(canadian * canadianDollar);
}

module.exports.uSToCanadian = function (us) {
    return roundTwoDecimals(us / canadianDollar);
}