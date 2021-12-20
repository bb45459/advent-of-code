const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

// const data = mock;
const data = input;

const split = data.split('\n\n');
const inputImage = split[1].split('\n').map(el => el.split(''));
const enhancement = split[0];

function printImage(image) {
    console.log(image.map(el => el.join('')).join('\n'))
}
function padWithDarkness(input) {
    const darkRow = input[0].map(el => '.');
    const padded = [darkRow, darkRow, ...input, darkRow, darkRow].map(row => ['.', '.', ...row, '.', '.'])

    return padded;
}
function padWithLightness(input) {
    const lightRow = input[0].map(el => '#');
    const padded = [lightRow, lightRow, ...input, lightRow, lightRow].map(row => ['#', '#', ...row, '#', '#'])

    return padded;
}
// padWithDarkness(input);
console.log(enhancement[0b111111111])
console.log(enhancement[0b000000000])

function getEnhancemnetLookup(window) {
    const string = window.flat().map(el => el === '#' ? '1' : '0').join('')
    const int = parseInt(string, 2);
    const lookup = enhancement[int];
    return lookup;
}

function getWindow(input, i, j) {
    const window = [input[i - 1].slice(j - 1, j + 2), input[i].slice(j - 1, j + 2), input[i + 1].slice(j - 1, j + 2)]
    return window;
}

function opposite(el) {
    return el === '#' ? '.' : '#';
}

function enhance(paddedInput) {
    let newImage = paddedInput.map(el => el.map(el => el));
    for (let i = 1; i < paddedInput.length - 1; i++) {
        for (let j = 1; j < paddedInput[0].length - 1; j++) {
            const window = getWindow(paddedInput, i, j);
            const lookup = getEnhancemnetLookup(window);
            newImage[i][j] = lookup
        }
    }
    // reverse the outer border
    newImage = newImage.map((el, i) => el.map((e, idx) => {
        if (i === 0 || i === newImage.length - 1) return opposite(e);
        else if (idx === 0 || idx === newImage[0].length - 1) return opposite(e);
        else return e;
    }));
    return newImage;
}

function countHashes(image) {
    const num = image.reduce((acc, curr) => acc + curr.reduce((a, c) => a + (c === '#' ? 1 : 0), 0), 0)
    return num;
}

const paddedInput = padWithDarkness(inputImage);
const newImage = enhance(paddedInput);
const paddedInput2 = padWithLightness(newImage);
const newImage2 = enhance(paddedInput2);
console.log('part1:', countHashes(newImage2))

let part2Image = inputImage;
for (let i = 0; i < 50; i += 2) {
    const paddedInput = padWithDarkness(part2Image);
    const newImage = enhance(paddedInput);
    const paddedInput2 = padWithLightness(newImage);
    part2Image = enhance(paddedInput2);
}
console.log('part2:', countHashes(part2Image))