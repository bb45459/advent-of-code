const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8');

const input = data.split('\n').map(el => Number(el));

const total = input.reduce((acc, curr, i, arr) => {
    return curr > arr[Math.max(i - 1, 0)] ? acc += 1 : acc
}, 0)

console.log('Part 1: ', total);

const window = input
    .reduce((acc, curr, i, arr) => {
        if (i >= arr.length - 2) {
            // no longer counts
            return acc
        }
        plus1 = i + 1;
        plus2 = i + 2;
        const sum = curr + arr[plus1] + arr[plus2];

        if (i === 0) {
            // return sum but no counter
            return {
                prevSum: sum,
                counter: acc.counter
            }
        }

        if (sum > acc.prevSum) {
            return {
                prevSum: sum,
                counter: acc.counter + 1
            }
        } else {
            return {
                prevSum: sum,
                counter: acc.counter
            }
        }
    }, { counter: 0, prevSum: 0 })

console.log('Part 2: ', window.counter)