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
// console.log(split)
const nodeMapping = {};
const start = split.filter(el => (el[0] === 'start' || el[1] === 'start'))
// console.log(start)
const startingRunners = start.map(el => el[0] === 'start' ? [el[1]] : [el[0]])
// console.log(startingRunners)

split.filter(el => (el[0] !== 'start' && el[1] !== 'start')).forEach(el => {
    nodeMapping[el[0]] = [...(nodeMapping[el[0]] || []), el[1]]
    nodeMapping[el[1]] = [...(nodeMapping[el[1]] || []), el[0]]
})
nodeMapping['end'] = [];
// console.log(nodeMapping)


function isLower(str) {
    const str2 = str;
    return str.toLowerCase() === str2 && str !== 'end'
}

/*
A, b
Ac, Aend, Ab
AcA, Abd
*/
const nodes = {
    'start': ['A', 'b'],
    'A': ['b', 'c', 'end'],
    'b': ['A', 'd', 'end'],
    'c': ['A'],
    'd': ['b'],
    'end': []
};

function addNewNodes(runner, doubleAllowed) {
    // console.log(runner)
    const maxTimes = (doubleAllowed && !anyDoubleLowers(runner)) ? 2 : 1;
    const last = runner[runner.length - 1];
    // console.log(last)
    if (last === 'end') return [runner];
    // const next = nodes[last];
    const next = nodeMapping[last];
    // console.log(next)
    const newRunner = next.filter(el => !(isLower(el) && runner.filter(stop => stop === el).length >= maxTimes)).map(el => {
        return [...runner, el]
    })
    // console.log(newRunner)
    return newRunner
}

function anyDoubleLowers(arr) {
    const lowers = arr.filter(el => isLower(el));
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

let starter = startingRunners;
let done = false;
do {
    let copy = starter.map(el => el);
    starter = starter.map(runner => addNewNodes(runner, false)).flat()
    // console.log(starter)
    done = copy.every((el, idx) => el.length === starter[idx].length);
} while (!done)
console.log('part1:', starter.length)

starter = startingRunners;
done = false;
do {
    let copy = starter.map(el => el);
    starter = starter.map(runner => addNewNodes(runner, true)).flat()
    // console.log(starter)
    done = copy.every((el, idx) => el.length === starter[idx].length);
} while (!done)

// console.log(starter)
console.log('part2:', starter.length)