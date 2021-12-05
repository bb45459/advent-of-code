const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf-8");

const boards = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

// const splitBoards = boards.split('\n\n');
const splitBoards = data.split('\n\n');
const nums = splitBoards.shift().split(',').map(el => Number(el));
// console.log(`nums`, nums)
// console.log(`splitBoards`, splitBoards);

const parsedBoards = splitBoards.map(board => board.split('\n').map(el => el.split(' ').filter(x => x).map(y => Number(y))));

const len = parsedBoards[0][0].length;

// return index of nums where row is solved
function getRowSolve(row) {
    const solveIdx = nums.reduce((acc, curr, i) => {
        if (acc.idx < Infinity) return acc
        const newAcc = row.includes(curr) ? { ...acc, solves: acc.solves + 1 } : acc
        if (newAcc.solves === len) {
            return {
                ...newAcc,
                idx: i
            }
        } else {
            return newAcc
        }
    }, { idx: Infinity, solves: 0 })
    return solveIdx;
}

function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
        return a.map(function (r) { return r[c]; });
    });
}

// return index of nums where board is solved
function solveBoard(board) {
    // check rows
    // console.log(`rows`, board)
    const solvedRows = board.map(row => getRowSolve(row))
    // get the mins
    const minRows = solvedRows.reduce((acc, curr) => curr.idx < acc.idx ? curr : acc)
    // console.log(`minRows`, minRows)

    // check columns
    // transpose
    const cols = transpose(board);
    // console.log(`cols`, cols)
    const solvedCols = cols.map(col => getRowSolve(col))
    // console.log(`solvedCols`, solvedCols)
    const minCols = solvedCols.reduce((acc, curr) => curr.idx < acc.idx ? curr : acc)
    // console.log(`minCols`, minCols)

    //
    return Math.min(minRows.idx, minCols.idx)
}

const solvedBoards = parsedBoards.map(solveBoard)
// console.log(`solvedBoards`, solvedBoards)
const numsIdxAtSolve = solvedBoards.reduce((acc, curr) => curr < acc ? curr : acc);
// console.log(`numsIdxAtSolve`, numsIdxAtSolve)
const firstSolvedIdx = solvedBoards.indexOf(numsIdxAtSolve)
// console.log(`firstSolvedIdx`, firstSolvedIdx)

const firstSolvedBoard = parsedBoards[firstSolvedIdx];
const numsCalled = nums.slice(0, numsIdxAtSolve + 1);
const unmarkedNumbers = firstSolvedBoard.flat().filter(el => !numsCalled.includes(el));
// console.log(`unmarkedNumbers`, unmarkedNumbers)
const sumUnmarked = unmarkedNumbers.reduce((acc, curr) => acc + curr);
// console.log(`sumUnmarked`, sumUnmarked)
const lastCalledNumber = nums[numsIdxAtSolve];
// console.log(`lastCalledNumber`, lastCalledNumber)

console.log('part1: ', lastCalledNumber * sumUnmarked)

// get index of solve
// slice nums array
// filter board for those to get sum unmarked

// console.log(`solvedBoards`, solvedBoards)
const numsIdxAtSolveMax = solvedBoards.reduce((acc, curr) => curr > acc ? curr : acc);
// console.log(`numsIdxAtSolve`, numsIdxAtSolveMax)
const firstSolvedIdxMax = solvedBoards.indexOf(numsIdxAtSolveMax)
// console.log(`last solved idx`, firstSolvedIdxMax)

const firstSolvedBoardMax = parsedBoards[firstSolvedIdxMax];
// console.log(`last solved board`, firstSolvedBoardMax)
const numsCalledMax = nums.slice(0, numsIdxAtSolveMax + 1);
const unmarkedNumbersMax = firstSolvedBoardMax.flat().filter(el => !numsCalledMax.includes(el));
// console.log(`unmarkedNumbers`, unmarkedNumbersMax)
const sumUnmarkedMax = unmarkedNumbersMax.reduce((acc, curr) => acc + curr);
// console.log(`sumUnmarked`, sumUnmarkedMax)
const lastCalledNumberMax = nums[numsIdxAtSolveMax];
// console.log(`lastCalledNumber`, lastCalledNumberMax)

console.log('part2: ', lastCalledNumberMax * sumUnmarkedMax)