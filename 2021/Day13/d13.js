const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

// const data = mock;
const data = input;
const coords = (data.split('\n\n')[0].split('\n')).map(el => el.split(',').map(Number))

function foldHorizontal(matrix, x) {
    // slice from 0 to x
    // slice from x to diff from first half
    // reverse the back half row
    // add to the acc
    // return
    const left = matrix.map(row => row.slice(0, x));
    const right = matrix.map(row => row.slice(x + 1, x + left[0].length + 1));
    // console.log(left)
    // console.log(right)
    return left.map((row, rowi) => {
        return row.map((col, coli) => col + right[rowi][row.length - coli - 1])
    })
}

function foldVertical(matrix, y) {
    // slice the acc from 0 to y
    // slice from y to the diff of the bottom half
    // reverse each column
    // add to the acc
    // return
    const top = matrix.slice(0, y);
    const bottom = matrix.slice(y + 1, y + top.length + 1);
    // console.log(top)
    // console.log(bottom)
    return top.map((row, rowi) => {
        return row.map((col, coli) => col + bottom[top.length - rowi - 1][coli])
    })
}

function constructMatrix(points) {
    const maxX = points.reduce((acc, el) => el[0] > acc ? el[0] : acc, 0)
    const maxY = points.reduce((acc, el) => el[1] > acc ? el[1] : acc, 0)
    let matrix = Array(maxY + 1).fill(Array(maxX + 1).fill(0))
    matrix = matrix.map(el => el.map(el => el))
    points.forEach(point => {
        matrix[point[1]][point[0]] = 1
    })
    return matrix
}

const matrix = constructMatrix(coords)
const folded = foldHorizontal(matrix, 655);
console.log('part1: ', folded.reduce((acc, curr) => {
    return acc + curr.reduce((acc, curr) => curr > 0 ? acc + 1 : acc, 0)
}, 0))

const commands = data.split('\n\n')[1].split('\n').filter(x => x);
console.log(commands)

let matrix2 = constructMatrix(coords);
commands.forEach((command) => {
    matrix2 = command.includes('y=') ?
        foldVertical(matrix2, Number(command.slice(command.indexOf('=') + 1))) :
        foldHorizontal(matrix2, Number(command.slice(command.indexOf('=') + 1)))
})
const matrix3 = matrix2.map(row => row.map(col => col > 0 ? '#' : '.').join(' ')).join('\n')
console.log(matrix3)