const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

// const mapping = {
//     CH: ['CB', 'BH'],
//     HH: ['HN', 'NH'],
//     CB: ['CH', 'HB'],
//     NH: ['NC', 'CH'],
//     HB: ['HC', 'CB'],
//     HC: ['HB', 'BC'],
//     HN: ['HC', 'CN'],
//     NN: ['NC', 'CN'],
//     BH: ['BH', 'HH'],
//     NC: ['NB', 'BC'],
//     NB: ['NB', 'BB'],
//     BN: ['BB', 'BN'],
//     BB: ['BN', 'NB'],
//     BC: ['BB', 'BC'],
//     CC: ['CN', 'NC'],
//     CN: ['CC', 'CN'],
// }

// const buckets = {
//     CH: 0,
//     HH: 0,
//     CB: 1,
//     NH: 0,
//     HB: 0,
//     HC: 0,
//     HN: 0,
//     NN: 1,
//     BH: 0,
//     NC: 1,
//     NB: 0,
//     BN: 0,
//     BB: 0,
//     BC: 0,
//     CC: 0,
//     CN: 0,
// }

// const data = mock;
const data = input;
const start = data.split('\n\n')[0];
const transforms = data.split('\n\n')[1].split('\n').map(el => el.split(' -> '));
const letterMapping = Object.fromEntries(transforms);
const pairMapping = Object.fromEntries(transforms.map(transform => [transform[0], [`${transform[0][0] + transform[1]}`, `${transform[1] + transform[0][1]}`]]));

const counts = {};
const buckets = {};
start.split('').forEach((letter) => {
    counts[letter] ? counts[letter] += 1 : counts[letter] = 1;
})
function iterate(currentInput, depth) {
    const newBuckets = {};
    Object.keys(buckets).forEach(bucket => newBuckets[bucket] = 0);
    Object.keys(buckets).forEach(bucket => {
        const newPairs = pairMapping[bucket]
        const newLetter = letterMapping[bucket]
        existingNumber = currentInput[bucket];
        counts[newLetter] ? counts[newLetter] += existingNumber : counts[newLetter] = existingNumber
        newPairs.forEach(pair => {
            newBuckets[pair] += existingNumber
        })
    })
    depth--;
    if (depth > 0) {
        return iterate(newBuckets, depth);
    } else {
        return newBuckets
    }
}

let pairs = [];
for (let i = 0; i < start.length - 1; i++) {
    pairs.push(`${start[i]}${start[i + 1]}`);
}
Object.keys(pairMapping).forEach(bucket => buckets[bucket] = 0);
pairs.forEach(pair => {
    buckets[pair] ? buckets[pair] += 1 : buckets[pair] = 1;
});
const depth = 40;
iterate(buckets, depth);

console.log(counts)
const maxCount = Object.entries(counts).reduce((acc, curr) => curr[1] > acc[1] ? curr : acc)[1];
const minCount = Object.entries(counts).reduce((acc, curr) => curr[1] < acc[1] ? curr : acc)[1];
console.log('diff: ', maxCount - minCount)