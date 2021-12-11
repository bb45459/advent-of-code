
const mock = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`

const input = `3113284886
2851876144
2774664484
6715112578
7146272153
6256656367
3148666245
3857446528
7322422833
8152175168`;

// const data = mock;
const data = input;

const split = data.split('\n').filter(x => x).map(el => el.split('').map(Number))

function step(matrix, flashes) {
    // increase all by 1
    const substep1 = matrix.map(row => row.map(el => el + 1))
    // all items with >9 flash increasing neighbor by 1
    // visit each point >9 and increase neighbors by 1 then turn 0
    let substep2 = substep1.map(el => el);
    for (let row = 0; row < substep2.length; row++) {
        for (let col = 0; col < substep2[row].length; col++) {
            if (substep2[row][col] > 9) {
                if (substep2[row][col - 1]) substep2[row][col - 1] += 1;
                if (substep2[row][col + 1]) substep2[row][col + 1] += 1;
                if (substep2[row - 1]?.[col - 1]) substep2[row - 1][col - 1] += 1;
                if (substep2[row - 1]?.[col]) substep2[row - 1][col] += 1;
                if (substep2[row - 1]?.[col + 1]) substep2[row - 1][col + 1] += 1;
                if (substep2[row + 1]?.[col - 1]) substep2[row + 1][col - 1] += 1;
                if (substep2[row + 1]?.[col]) substep2[row + 1][col] += 1;
                if (substep2[row + 1]?.[col + 1]) substep2[row + 1][col + 1] += 1;

                // set all >9 to 0
                substep2[row][col] = 0;
                flashes += 1;
                col = -1;
                row = 0;
            }
        }
    }
    return { substep2, flashes }
}

function recCall(input, times, flashes) {
    let counter = times;
    const resp = step(input, flashes);
    counter--;
    if (counter === 0) {
        return resp;
    } else {
        return recCall(resp.substep2, counter, resp.flashes)
    }
}

const stop = recCall(split, 100, 0);
console.log('part1: ', stop.flashes)

function findSimul(input, times) {
    let counter = times;
    const resp = step(input, times);
    counter++;
    if (resp.substep2.every(row => row.every(el => el === 0))) {
        return counter;
    } else {
        return findSimul(resp.substep2, counter)
    }
}
const simul = findSimul(split, 0);
console.log('part2: ', simul)