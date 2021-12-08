const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

// const mock2 = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

const data = input;
// const data = mock;
// const data = mock2;
const outputs = data.split('\n').filter(x => x).map(el => el.split(' | ')[1].split(' '))
console.log(outputs)

console.log('part1: ', outputs.reduce((acc, curr) => {
    return acc + curr.reduce((a, c) => {
        return a + ([2, 3, 4, 7].includes(c.length) ? 1 : 0)
    }, 0)
}, 0))

const inputs = data.split('\n').filter(x => x).map(el => el.split(' | ')[0].split(' '))
console.log(inputs)

function solveInput(input) {
    const mapper = {};
    const twoLetters = input.filter(el => el.length === 2);
    mapper[twoLetters[0]] = 1;
    const threeLetters = input.filter(el => el.length === 3);
    mapper[threeLetters[0]] = 7;
    const fourLetters = input.filter(el => el.length === 4);
    mapper[fourLetters[0]] = 4;
    const sevenLetters = input.filter(el => el.length === 7);
    mapper[sevenLetters[0]] = 8;
    const sixLetters = input.filter(el => el.length === 6);
    console.log(sixLetters)
    // of the 6 letters whatever doesn't have what is in 7 is 6
    const six = sixLetters.find(el => !threeLetters[0].split('').every(letter => el.includes(letter)))
    console.log(six)
    mapper[six] = 6;
    // of the remaining 2 whatever doesn't have all of 4 is the 0
    const zero = sixLetters
        .filter(el => { console.log(el, threeLetters[0]); return threeLetters[0].split('').every(letter => el.includes(letter)) })
        .find(el => {
            console.log(el, fourLetters[0])
            return !fourLetters[0].split('').every(letter => el.includes(letter))
        })
    console.log(zero)
    mapper[zero] = 0;

    // last one is 9
    const nine = sixLetters.find(el => ![six, zero].includes(el))
    console.log(nine)
    mapper[nine] = 9;

    // of the remaining 2 whatever has all of the things in 1 is the 3
    const fiveLetters = input.filter(el => el.length === 5);
    console.log(fiveLetters)
    const three = fiveLetters.find(el => twoLetters[0].split('').every(letter => el.includes(letter)))
    console.log(three)
    mapper[three] = 3;

    // of the 5 letters whatever only has 2 of the things in 4 is the 2
    const two = fiveLetters.filter(el => el !== three)
        .find(el => fourLetters[0].split('').reduce((acc, curr) => {
            return el.includes(curr) ? acc + 1 : acc
        }, 0) === 2)
    console.log(two)
    mapper[two] = 2;

    // last one is the 5
    const five = fiveLetters.find(el => el !== three && el !== two)
    console.log(five)
    mapper[five] = 5;

    console.log(mapper)
    return mapper;
}

function solveOutput(mapper, outputs) {
    console.log(outputs)
    const ans = outputs.map(output => {
        const key = Object.keys(mapper).filter(el => el.length === output.length).find(el => output.split('').every(letter => el.includes(letter)))
        return mapper[key];
    }).join('')
    console.log(ans)
    return parseInt(ans);
}

// console.log(solveInput(inputs[0]))
const map = solveInput(inputs[0])
console.log(map)
console.log(solveOutput(solveInput(inputs[0]), outputs[0]))

const ans = inputs.map((input, i) => {
    const mapper = solveInput(input);
    const out = solveOutput(mapper, outputs[i])
    return out;
})
console.log(ans)
console.log('part2: ', ans.reduce((acc, curr) => acc + curr, 0))
