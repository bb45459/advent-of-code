const goalx = [20, 30];
const goaly = [-10, -5];
// const goalx = [34, 67]
// const goaly = [-215, -186];

function gatherXPositions(v0x, maxX) {
    let t = 0;
    let pos = [];

    do {
        pos.push(((v0x - t) * (v0x - t + 1) / 2));
        t++;
    } while (t < v0x);
    return pos
}

console.log(gatherXPositions(6, goalx[1]))