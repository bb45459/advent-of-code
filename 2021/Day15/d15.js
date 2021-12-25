const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const mock2 = `
41 41 40 34 37 30 25 35 32 41
40 40 39 31 30 29 24 28 28 39
39 37 36 33 27 22 21 22 21 37
43 42 39 30 31 22 20 19 19 29
40 36 32 26 23 19 21 14 13 20
33 32 29 28 19 18 21 13 12 19
32 31 32 34 25 16 15 13  9 12
31 28 27 25 20 16 14 13  7 11
36 35 33 24 21 20 17  9  4  2
38 36 33 32 31 22 18 14  9  1
`;
// const mock = `123
// 123
// 321`;

/**
 * 1 2 3
 * 1 2 3
 * 3 2 1
 * 
 * 7 7 7
 * 6 5 4
 * 6 3 1
 */

// const version = mock;
const version = input;
const data = version.split('\n').map(el => el.split('').map(Number))
console.log('data', data)

const energy = data.map(row => row.map(() => 0))

for (let i = data.length - 1; i >= 0; i--) {
    for (let j = data[i].length - 1; j >= 0; j--) {
        const borders = {
            bottom: data[i + 1]?.[j] || Infinity,
            right: data[i][j + 1] || Infinity,
            top: data[i - 1]?.[j] || Infinity,
            left: data[i]?.[j - 1] || Infinity,
        }

        // if ((i === data.length - 1) && (j === data[i].length - 1)) {
        //     energy[i][j] = data[i][j];
        // } else {
        //     energy[i][j] = data[i][j] + Math.min(borders.bottom, borders.right)
        // }

        // if both use lower
        if (data[i][j + 1] && data[i + 1]?.[j] && data[i][j + 1] && data[i + 1]?.[j]) {
            energy[i][j] = data[i][j] + Math.min(energy[i][j + 1], energy[i + 1][j])
        }
        // if no bottom use right
        else if (data[i][j + 1] && !data[i + 1]?.[j]) {
            energy[i][j] = data[i][j] + energy[i][j + 1]
        }
        // if no right use bottom
        else if (!data[i][j + 1] && data[i + 1]?.[j]) {
            energy[i][j] = data[i][j] + energy[i + 1][j]
        } else {
            // if neither use self
            energy[i][j] = data[i][j];
        }
    }
}
console.log('final energy', energy)

let i = 0;
let j = 0;
let acc = 0;

console.log(data.length)
console.log(data[0].length)

function traversePathOfLeastResistance(matrix) {
    // console.log(i, j)
    if ((i === matrix.length - 1) && (j === matrix[0].length - 1)) {
        return;
    }

    const borders = {
        bottom: energy[i + 1]?.[j] || Infinity,
        right: energy[i][j + 1] || Infinity,
        // top: energy[i - 1]?.[j] || Infinity,
        // left: energy[i]?.[j - 1] || Infinity,
    }
    // console.log(borders)
    // const min = Object.entries(borders).filter(el => el[0] !== cameFrom).reduce((acc, curr) => acc[1] < curr[1] ? acc : curr)

    if (borders.bottom < borders.right) {
        acc += matrix[i + 1][j];
        i++;
    } else {
        acc += matrix[i][j + 1];
        j++;
    }

    traversePathOfLeastResistance(matrix);
}
traversePathOfLeastResistance(data)
console.log('part1: ', acc)
