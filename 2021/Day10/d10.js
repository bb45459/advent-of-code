const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

// const data = mock;
const data = input;
const split = data.split('\n').filter(x => x);
const lineSplit = split.map(el => el.split(''));

const mapper = {
    '[': ']',
    '(': ')',
    '{': '}',
    '<': '>',
}
const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

function findCorruptIcon(list) {
    // traverse the string pushing and poppping on close
    const tracker = [];
    let invalidChar = '';
    list.forEach(char => {
        if (invalidChar !== '') return;
        if (Object.values(mapper).includes(char)) {
            if (char === mapper[tracker[tracker.length - 1]]) {
                tracker.pop();
            } else {
                console.log(`Expected ${mapper[tracker[tracker.length - 1]]}, but found ${char}`)
                invalidChar = char;
                return;
            }
        } else {
            tracker.push(char)
        }
    })
    return { invalidChar, tracker }
}
const allRows = lineSplit.map(row => {
    const ans = findCorruptIcon(row);
    return ans.invalidChar
}).filter(ans => ans !== '')
const part1 = allRows.reduce((acc, curr) => acc + points[curr], 0)
console.log('part1: ', part1)

const completionPoints = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

function computeScore(chars) {
    return chars.reduce((acc, curr) => {
        return (acc * 5) + completionPoints[curr]
    }, 0)
}
const incompleteRows = lineSplit.map(row => {
    const ans = findCorruptIcon(row);
    return ans
}).filter(ans => ans.invalidChar === '').map(el => el.tracker);

const closers = incompleteRows.map(row => row.map(char => mapper[char]).reverse())
const totalScores = closers.map(row => computeScore(row))
const middle = totalScores.sort((a, b) => a - b)[Math.floor(totalScores.length / 2)]
console.log('part2: ', middle)
