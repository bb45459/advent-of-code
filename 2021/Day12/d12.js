const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const mock2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const mock3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`


// const data = mock;
// const data = mock2;
// const data = mock3;
const data = input;
const split = data.split('\n').filter(x => x).map(el => el.split('-'));
const nodeMapping = {};
const start = split.filter(el => (el[0] === 'start' || el[1] === 'start'))
const startingRunners = start.map(el => el[0] === 'start' ? [el[1]] : [el[0]])

split.filter(el => (el[0] !== 'start' && el[1] !== 'start')).forEach(el => {
    nodeMapping[el[0]] = [...(nodeMapping[el[0]] || []), el[1]]
    nodeMapping[el[1]] = [...(nodeMapping[el[1]] || []), el[0]]
})
nodeMapping['end'] = [];


function isLowerAndNotEnd(str) {
    return str.toLowerCase() === str && str !== 'end'
}

/*
Take an array of active and complete runs
Check current node of each run
Create new run for each valid next node
*/
function addNewNodes(runner, doubleAllowed) {
    const maxVisits = (doubleAllowed && !anyDoubleLowers(runner)) ? 2 : 1;
    const currentNode = runner[runner.length - 1];
    if (currentNode === 'end') return [runner];
    const nextNodes = nodeMapping[currentNode];
    const newRunners = nextNodes
        .filter(el => !(isLowerAndNotEnd(el) && runner.filter(stop => stop === el).length >= maxVisits))
        .map(el => {
            return [...runner, el]
        })
    return newRunners
}

// Check if array contains any lower case copies
function anyDoubleLowers(arr) {
    const lowers = arr.filter(el => isLowerAndNotEnd(el));
    if (lowers.length === 0) return false;
    const hasDouble = lowers.reduce((acc, curr) => {
        if (acc.ans) return acc;
        if (acc.arr.includes(curr)) {
            acc.ans = true;
            return acc;
        } else {
            acc.arr.push(curr);
            return acc;
        }
    }, { ans: false, arr: [] })
    return hasDouble.ans
}

let runners = startingRunners;
let done = false;
do {
    const copy = runners.map(el => el);
    runners = runners.map(runner => addNewNodes(runner, false)).flat()
    done = copy.every((el, idx) => el.length === runners[idx].length);
} while (!done)
console.log('part1:', runners.length)

runners = startingRunners;
done = false;
do {
    const copy = runners.map(el => el);
    runners = runners.map(runner => addNewNodes(runner, true)).flat()
    done = copy.every((el, idx) => el.length === runners[idx].length);
} while (!done)

console.log('part2:', runners.length)