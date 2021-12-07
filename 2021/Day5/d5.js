const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf-8");

const mock = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

// const split = mock.split('\n');
const split = data.split('\n').filter(el => el);
const pairs = split.map(el => el.split(' -> ').map(el => el.split(',').map(el => Number(el))))
console.log(pairs)
const straightOnly = pairs.filter(el => el[0][0] === el[1][0] || el[0][1] === el[1][1])
console.log(straightOnly)

const max = pairs.flat(2).reduce((acc, cur) => cur > acc ? cur : acc)
console.log(max)
const matrix = Array(max + 1).fill(Array(max + 1).fill(0))
console.log(matrix)

// fill the matrix
const firstPair = straightOnly[0];

function createOnesMatrix(emptyMatrix, pair) {
    const newMatrix = emptyMatrix.map(el => el.map(el => el));

    // diagonal
    if (pair[0][0] !== pair[1][0] && pair[0][1] !== pair[1][1]) {
        const reverse = ((pair[1][1] - pair[0][1]) / (pair[1][0] - [pair[0][0]])) < 0
        // console.log(pair)
        // console.log(reverse)
        const mincol = Math.min(pair[0][0], pair[1][0]);
        const maxcol = Math.max(pair[0][0], pair[1][0])
        const minrow = Math.min(pair[0][1], pair[1][1]);
        const maxrow = Math.max(pair[0][1], pair[1][1])
        if (reverse) {
            let col = mincol;
            for (let row = maxrow; row >= minrow; row--) {
                newMatrix[row][col] = 1
                col++;
            }
        } else {
            let col = mincol;

            for (let row = minrow; row <= maxrow; row++) {
                newMatrix[row][col] = 1
                col++;
            }
        }
        return newMatrix;
    }

    const xOrY = pair[0][0] === pair[1][0] ? 1 : 0;
    if (xOrY === 1) {
        for (let i = Math.min(pair[0][xOrY], pair[1][xOrY]); i <= Math.max(pair[0][xOrY], pair[1][xOrY]); i++) {
            newMatrix[i][pair[0][0]] = 1
        }
    } else {
        for (let i = Math.min(pair[0][xOrY], pair[1][xOrY]); i <= Math.max(pair[1][xOrY], pair[0][xOrY]); i++) {
            newMatrix[pair[0][1]][i] = 1
        }
    }
    return newMatrix
}
function addMatrices(matrix1, matrix2) {
    return matrix1.map((row, i) => row.map((col, j) => col + matrix2[i][j]))
}
// console.log(createOnesMatrix(matrix, firstPair))

const ans = straightOnly.reduce((acc, pair) => {
    // console.log(pair)
    const ones = createOnesMatrix(matrix, pair)

    return addMatrices(acc, ones)
}, matrix)

console.log(ans.reduce((acc, curr) => acc + curr.reduce((a2, c2) => c2 > 1 ? a2 + 1 : a2, 0), 0))

// part 2
const ans2 = pairs.reduce((acc, pair) => {

    // console.log(pair)
    const ones = createOnesMatrix(matrix, pair)
    // console.log(ones)

    return addMatrices(acc, ones)
}, matrix)
// console.log(ans2)

console.log(ans2.reduce((acc, curr) => acc + curr.reduce((a2, c2) => c2 > 1 ? a2 + 1 : a2, 0), 0))