const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

const mock2 = `...>...
.......
......>
v.....>
......>
.......
..vvv..`;

const data = input;
// const data = mock;
// const data = mock2;

// east first then south
// wraps around
// east = 1;
// south = 2;
const grid = data.split('\n').map(row => row.split('').map(el => {
    if (el === '>') return 1;
    else if (el === 'v') return 2;
    else return 0;
}))

function checkCanMove(variant, xPos, yPos, grid) {
    if (variant === 0) {
        return false;
    }
    if (variant === 1) {
        // check right
        if (xPos === grid[0].length - 1) {
            const right = grid[yPos][0]
            return right === 0;
        } else {
            const right = grid[yPos][xPos + 1]
            return right === 0;
        }
    }
    if (variant === 2) {
        // check down
        if (yPos === grid.length - 1) {
            const down = grid[0][xPos]
            return down === 0;
        } else {
            const down = grid[yPos + 1][xPos]
            return down === 0;
        }
    }
}

let counter = 0;
let rightMovers = [];
let downMovers = [];
console.log(grid.map(el => el.join('')).join('\n'))
do {
    // console.log(grid.map(el => el.join('')).join('\n'))
    rightMovers = [];
    // search left to right and top to bottom so that leads don't attempt to move first
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[0].length - 1; j >= 0; j--) {
            const el = grid[i][j];
            const canMove = checkCanMove(el, j, i, grid);
            if (canMove && el === 1) {
                rightMovers.push([i, j])
            }
        }
    }

    console.log(rightMovers)
    rightMovers.forEach(mover => {
        if (mover[1] === grid[0].length - 1) {
            grid[mover[0]][0] = 1;
            grid[mover[0]][mover[1]] = 0;
        } else {
            grid[mover[0]][mover[1] + 1] = 1;
            grid[mover[0]][mover[1]] = 0;
        }
    });

    // console.log(grid.map(el => el.join('')).join('\n'))
    downMovers = [];
    for (let j = grid[0].length - 1; j >= 0; j--) {
        for (let i = grid.length - 1; i >= 0; i--) {
            const el = grid[i][j];
            const canMove = checkCanMove(el, j, i, grid);
            if (canMove && el === 2) {
                downMovers.push([i, j])
            }
        }
    }
    console.log(downMovers)
    downMovers.forEach(mover => {
        if (mover[0] === grid.length - 1) {
            grid[0][mover[1]] = 2;
            grid[mover[0]][mover[1]] = 0;
        } else {
            grid[mover[0] + 1][mover[1]] = 2;
            grid[mover[0]][mover[1]] = 0;
        }
    });

    counter++;
    // console.log(counter)
    // console.log(grid.map(el => el.join('')).join('\n'))
} while (rightMovers.length > 0 || downMovers.length > 0)