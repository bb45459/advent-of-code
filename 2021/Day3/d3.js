const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf-8");

let input = data.split("\n").filter(el => el).map((el) => {
    const row = el.split("").map(el => Number(el));
    return row;
});

const summed = input.reduce((acc, curr) => {
    return acc.map((el, i) => el + curr[i])
})
const gamma = summed.map(el => el > input.length / 2 ? 1 : 0).join('')
const epsilon = summed.map(el => el < input.length / 2 ? 1 : 0).join('')

const decGamma = parseInt(gamma, 2)
const decEpsilon = parseInt(epsilon, 2)

console.log('part1: ', decGamma * decEpsilon)

function mostCommonDef1(arr, totalLength) {
    return arr.map((el, i) => {
        if (i === arr.length - 1) return 1;
        return el >= totalLength / 2 ? 1 : 0
    })
};

function mostCommonDef0(arr, totalLength) {
    return arr.map((el, i) => {
        if (i === arr.length - 1) return 0;
        return el < totalLength / 2 ? 1 : 0
    })
};

function sumArray(arr) {
    return arr.reduce((acc, curr) => {
        return acc.map((el, i) => el + curr[i])
    })
}

function oxyRecFilter(arr, idx) {
    const summed = sumArray(arr);
    const mostCommon = mostCommonDef1(summed, arr.length);
    const filtered = arr.filter(el => el[idx] === mostCommon[idx]);
    if (filtered.length === 1) {
        return filtered
    } else {
        return oxyRecFilter(filtered, idx + 1)
    }
}

function co2RecFilter(arr, idx) {
    const summed = sumArray(arr);
    const mostCommon = mostCommonDef0(summed, arr.length);
    const filtered = arr.filter(el => el[idx] === mostCommon[idx]);
    if (filtered.length === 1) {
        return filtered
    } else {
        return co2RecFilter(filtered, idx + 1)
    }
}

const oxy = oxyRecFilter(input, 0).flat().join('')
const co2 = co2RecFilter(input, 0).flat().join('')

console.log(`oxy`, oxy)
console.log(`co2`, co2)
console.log(`parseInt(oxy, 2)`, parseInt(oxy, 2))
console.log(`parseInt(co2, 2)`, parseInt(co2, 2))
console.log(`part2: `, parseInt(oxy, 2) * parseInt(co2, 2))
