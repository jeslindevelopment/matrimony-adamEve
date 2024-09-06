const monthDiff = (d1, d2) => {
    d1 = new Date(d1);
    d2 = new Date(d2);
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


module.exports = {
    monthDiff,
}
