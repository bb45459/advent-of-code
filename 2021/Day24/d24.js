const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const commands = input.split('\n');

const zDivisions = [1, 1, 1, 1, 26, 26, 1, 1, 26, 26, 26, 1, 26, 26, 26]
const uniqueNumber1 = [10, 11, 14, 13, -6, -14, 14, 13, -8, -15, 10, -11, -13, -4]
const uniqueNumber2 = [1, 9, 12, 6, 9, 15, 7, 12, 15, 3, 6, 2, 10, 12]


function iterate(w, z, zDivision, uniqueNumber1, uniqueNumber2) {
    //     check the mod of accumulated z and 26			
    // change z to the floor of z and either 26 or 1			
    // operate on mod with unique number			
    // if operated mod equals input			if operated mod does not equal input
    // pass through z			multiply accumulated z by 26
    // 			operate on input value with second unique number
    // pass through z			add operated value to z
    const mod = z % 26;
    const newZ = Math.floor(z / zDivision);
    const operatedMod = mod + uniqueNumber1;
    if (operatedMod === w) {
        const finalz = newZ;
        return finalz;
    } else {
        const finalz = newZ * 26 + (uniqueNumber2 + w);
        return finalz;
    }
}

// const guess = (11111111111111).toString().split('').map(Number);

const oneThoughNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let goodGuesses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let validZAccs = [5, 6, 7, 8, 9, 10, 11, 12, 13] // final col input
const firstColOutput = [2, 3, 4, 5, 6, 7, 8, 9, 10] // first col outputs
// guessnumber to zin required
const validZMapper = {
    1: [5],
    2: [6],
    3: [7],
    4: [8],
    5: [9],
    6: [10],
    7: [11],
    8: [12],
    9: [13],
};
// let guess = 11;
for (let t = 1; t < 8; t++) {
    const newGuesses = goodGuesses.map(goodGuess => {
        // console.log(`goodGuess`, goodGuess)
        // console.log(oneThoughNine.map(num => num * (10 ** t) + goodGuess))
        return oneThoughNine.slice(2).map(num => num * (10 ** t) + goodGuess)
    }).flat()
    console.log('guesses', newGuesses)
    console.log(`t`, t)
    goodGuesses = [];
    const newValidZIn = [];
    newGuesses.forEach((newGuess, i) => {
        // console.log(i, newGuesses.length)
        const guess = (newGuess).toString().split('').map(Number);
        const rounds = guess.length;
        for (let n = 0; n < 1000; n++) {
            let zAcc = n;
            // for (let i = 0; i < rounds; i++) {
            //     zAcc = iterate(guess[i], zAcc, zDivisions[13 - i], uniqueNumber1[13 - i], uniqueNumber2[13 - i]);
            // }
            zAcc = iterate(guess[0], zAcc, zDivisions[13 - t], uniqueNumber1[13 - t], uniqueNumber2[13 - t]);
            // console.log('zAcc', zAcc)
            // if (validZAccs.includes(zAcc)) {
            if (validZMapper[parseInt(guess.slice(1).join(''))].includes(zAcc) && validZAccs.includes(zAcc)) {
                // console.log(validZMapper[parseInt(guess.slice(1).join(''))], zAcc)
                goodGuesses.push(newGuess);
                newValidZIn.push(n);
                // if (validZMapper[newGuess]?.length) console.log('collision!', newGuess)
                if (validZMapper[newGuess]) {
                    validZMapper[newGuess] = [...validZMapper[newGuess], n]
                } else {
                    validZMapper[newGuess] = [n]
                }
                // console.log(newGuess, 'good guess', guess[0], 'zIn', n, 'num1', uniqueNumber1[13 - t], 'num2', uniqueNumber2[13 - t], 'zOut', zAcc)
            }
        }
    })
    console.log('valid z mapper', validZMapper)
    validZAccs = newValidZIn.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    console.log('valid z in', validZAccs)
    goodGuesses = goodGuesses.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    console.log('good guesses', goodGuesses)
}

for (let t = 1; t < 8; t++) {
    const newGuesses = goodGuesses.map(goodGuess => {
        // console.log(`goodGuess`, goodGuess)
        // console.log(oneThoughNine.map(num => num * (10 ** t) + goodGuess))
        return oneThoughNine.slice(2).map(num => num * (10 ** t) + goodGuess)
    }).flat()
    console.log('guesses', newGuesses)
    console.log(`t`, t)
    goodGuesses = [];
    const newValidZIn = [];
    newGuesses.forEach((newGuess, i) => {
        // console.log(i, newGuesses.length)
        const guess = (newGuess).toString().split('').map(Number);
        const rounds = guess.length;
        for (let n = 0; n < 1000; n++) {
            let zAcc = n;
            // for (let i = 0; i < rounds; i++) {
            //     zAcc = iterate(guess[i], zAcc, zDivisions[13 - i], uniqueNumber1[13 - i], uniqueNumber2[13 - i]);
            // }
            zAcc = iterate(guess[t], zAcc, zDivisions[t], uniqueNumber1[t], uniqueNumber2[t]);
            // console.log('zAcc', zAcc)
            // if (validZAccs.includes(zAcc)) {
            if (validZMapper[parseInt(guess.slice(1).join(''))].includes(zAcc) && validZAccs.includes(zAcc)) {
                // console.log(validZMapper[parseInt(guess.slice(1).join(''))], zAcc)
                goodGuesses.push(newGuess);
                newValidZIn.push(n);
                // if (validZMapper[newGuess]?.length) console.log('collision!', newGuess)
                if (validZMapper[newGuess]) {
                    validZMapper[newGuess] = [...validZMapper[newGuess], n]
                } else {
                    validZMapper[newGuess] = [n]
                }
                // console.log(newGuess, 'good guess', guess[0], 'zIn', n, 'num1', uniqueNumber1[13 - t], 'num2', uniqueNumber2[13 - t], 'zOut', zAcc)
            }
        }
    })
    console.log('valid z mapper', validZMapper)
    validZAccs = newValidZIn.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    console.log('valid z in', validZAccs)
    goodGuesses = goodGuesses.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], [])
    console.log('good guesses', goodGuesses)
}

// 82824742516151 too low

function solve() {
    const newGuess = 7
    const guess = (newGuess).toString().split('').map(Number);
    const rounds = guess.length;
    // for (let n = 0; n < 10000; n++) {
    // let zAcc = n;
    let zAcc = 0;
    for (let i = 0; i < rounds; i++) {
        // zAcc = iterate(guess[i], zAcc, zDivisions[13 - i], uniqueNumber1[13 - i], uniqueNumber2[13 - i]);
        // zAcc = iterate(guess[i], zAcc, zDivisions[i], uniqueNumber1[i], uniqueNumber2[i]);
        zAcc = iterate(guess[i], 0, zDivisions[i], uniqueNumber1[i], uniqueNumber2[i]);
        // console.log(n, zAcc)
    }
    console.log(zAcc)
    if (zAcc === 0) {
        console.log('good guess', guess, n, zAcc)
    }
    // }
}

// last col = zAcc - (4+in)
// how many times does 26 go into you, else add the input to the num2 if less than 26

// first col adds 1 to the input number
console.log(solve());