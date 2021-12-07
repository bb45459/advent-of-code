const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

// const input = '16,1,2,0,4,2,7,1,2,14';
const data = input.split(',').map(Number).sort((a, b) => a - b);



function getMinDist(arr) {
    let ans = Infinity;
    for (let i = 0; i < data[data.length - 1]; i++) {
        const totalFuel = arr.reduce((acc, curr, idx, array) => {
            return acc + Math.abs(i - curr)
        }, 0)
        if (totalFuel < ans) ans = totalFuel;
    }
    return ans
}

console.log('part1: ', getMinDist(data))

function getFuel(dist) {
    // n(n + 1) / 2
    return dist * (dist + 1) / 2
}

function getMinDistPart2(arr) {
    let ans = Infinity;
    for (let i = 0; i < data[data.length - 1]; i++) {
        const totalFuel = arr.reduce((acc, curr, idx, array) => {
            return acc + getFuel(Math.abs(i - curr))
        }, 0)
        if (totalFuel < ans) ans = totalFuel;
    }
    return ans
}

console.log('part2: ', getMinDistPart2(data))