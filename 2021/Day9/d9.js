const fs = require("fs");
// const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `2199943210
3987894921
9856789892
8767896789
9899965678`

// const data = input;
const data = mock;

const parsed = data.split('\n').map(el => el.split('').map(Number))
console.log(parsed)

function checkIfMin(i, j, arr) {
    const val = arr[i][j];
    const left = arr[i][j - 1] ?? Infinity;
    const right = arr[i][j + 1] ?? Infinity;
    const top = arr[i - 1]?.[j] ?? Infinity;
    const bottom = arr[i + 1]?.[j] ?? Infinity;
    // console.log(val, left, right, top, bottom)
    const min = [left, right, top, bottom].every(el => el > val);
    // console.log(min)
    return min
}
// console.log(checkIfMin(0, 0, parsed))
const part1 = parsed.reduce((acc, curr, i, arr) => {
    const minSum = curr.reduce((a, c, j) => {
        return a + (checkIfMin(i, j, arr) ? c + 1 : 0)
    }, 0)
    // console.log(minSum)
    return acc + minSum
}, 0)

console.log('part1: ', part1)

// we found all the local minima
// pad the whole matrix with 9s?
// for each local minima spread out to fill the basin?
// scan left to right, upper and lower bound on the 9s
// keep track of the height, each time it goes to 0 the basin ends
parsed.unshift(Array(10).fill(9))
parsed.push(Array(10).fill(9))

function findBasinSlices(startCol, which9toStartAt) {
    console.log('startCol: ', startCol)
    if (startCol > 9) return { sum: 0, col: startCol };
    let basinSlice;
    let col = startCol;
    let sum = 0;
    do {
        console.log(col)
        const firstCol = parsed.map(el => el[col]);
        console.log('firstCol: ', firstCol)
        const nines = firstCol.reduce((acc, el, i) => {
            if (el === 9) acc.push(i)
            return acc;
        }, [])
        console.log(nines);
        // const first9idx = 0;
        const first9idx = nines[which9toStartAt];
        console.log(first9idx)
        // const bottom9idx = Math.max(0, firstCol.findIndex(el => el === 9));
        const bottom9idx = nines[which9toStartAt + 1];
        console.log(bottom9idx)
        basinSlice = bottom9idx - first9idx - 1;
        console.log(basinSlice)
        sum += basinSlice;
        if (basinSlice === 1 && parsed[(bottom9idx + first9idx) / 2]?.[col + 1] === 9) {
            console.log('here')
            basinSlice = 0;
        }
        col++;
    } while (basinSlice > 0 && col < 10)
    console.log(col)
    // findBasinSlices(col + 1);
    // return sum
    return { sum, col };
}
// console.log(findBasinSlices(0))
// console.log(findBasinSlices(6))
// console.log(findBasinSlices(5))
// console.log(findBasinSlices(8))
// console.log(findBasinSlices(9))
// console.log(findBasinSlices(10))
// const firstCall = findBasinSlices(0);
// console.log(findBasinSlices(firstCall.col))
let acc = 0;
let col = 0;
// // for (let col = 0; col < 1; col++) {
while (col < 10) {
    console.log(col)
    const { sum: newSum, col: newCol } = findBasinSlices(col, 1);
    console.log(newSum, newCol)
    acc += newSum;
    col = newCol;
}

console.log(acc)

// acc = 0;
// col = 0;
// // // for (let col = 0; col < 1; col++) {
// while (col < 10) {
//     console.log(col)
//     const { sum: newSum, col: newCol } = findBasinSlices(col, 1);
//     console.log(newSum, newCol)
//     acc += newSum;
//     col = newCol;
// }