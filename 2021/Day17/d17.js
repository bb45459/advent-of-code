// x(t) = x + v * t;
// v(t) = v > 0 : v - t else v + t else v;
// y(t) = y

// const goalx = [20, 30];
// const goaly = [-10, -5];
const goalx = [34, 67]
const goaly = [-215, -186];

function xPos(x, v) {
    return x + v;
}
function yPos(y, v) {
    return y + v;
}
function newVx(vx) {
    if (vx === 0) return vx;
    if (vx > 0) return vx - 1;
    if (vx < 0) return vx + 1;
}
function newVy(vy) {
    return vy - 1;
}
function increment() {
    x = x + vx;
    y = y + vy;
    // console.log('pos:', x, y)
    vx = newVx(vx)
    vy = newVy(vy)
    // console.log('vel:', vx, vy)
}
function checkIfSolved(x, y) {
    const ans = goalx[0] <= x && x <= goalx[1] && goaly[0] <= y && y <= goaly[1];
    if (ans) console.log('hit!', y);
    return ans;
}
function checkIfTooFar(x, y) {
    if (x > goalx[1]) {
        console.log('too long')
        return true;
    }
    if (y < goaly[1]) {
        console.log('below')
        return true;
    }
    return false;
}

let maxy = 0;
let maxYVelo = 0;
let v0y = 2;
let v0x = 7;
const x0 = 0;
const y0 = 0;

let x = x0;
let y = y0;
let vx = v0x;
let vy = v0y;

function runArc(v0x, v0y) {
    x = 0;
    y = 0;
    vx = v0x;
    vy = v0y;
    let yHistory = [];
    let xHistory = [];
    let localMaxY = y;
    let localMaxYVelo = 0;
    while (true) {
        increment()
        yHistory.push(y);
        xHistory.push(x);

        if (y > localMaxY) {
            localMaxY = y;
            localMaxYVelo = v0y;
        }
        if (vy < 0 && localMaxY < maxy) {
            console.log('not high enough')
            break;
        }
        const solved = checkIfSolved(x, y);
        if (solved) {
            maxy = localMaxY;
            maxYVelo = localMaxYVelo;
            break;
        };
        const miss = checkIfTooFar(x, y);
        if (miss) {
            break;
        }
    }
    console.log('x', xHistory)
    console.log('y', yHistory)
}

function findLowerBound(goalx0) {
    let done = false;
    let i = 1;
    while (!done) {
        const res = i * (i + 1) / 2;
        if (res >= goalx0) {
            done = true;
            return i;
        }
        i++;
    }
}
function findUpperBound(goalx1) {
    let done = false;
    let i = 1;
    while (!done) {
        const res = i * (i + 1) / 2;
        if (res >= goalx1) {
            done = true;
            return i - 1;
        }
        i++;
    }
}
const lowerBoundX = findLowerBound(goalx[0])
const upperBoundX = findUpperBound(goalx[1])
console.log('for positive y')
console.log(lowerBoundX, upperBoundX)
for (let i = lowerBoundX; i <= upperBoundX; i++) {
    for (let j = 1; j < 300; j++) {
        runArc(i, j)
    }
}
console.log('maxy', maxy)
console.log(`maxYVelo`, maxYVelo)