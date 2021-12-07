const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf-8");


// const data = `3,4,3,1,2`;

class Fish {
    constructor(timer) {
        this.timer = timer;
    }

    age() {
        if (this.timer === 0) {
            this.timer = 6;
            return;
        }
        this.timer -= 1;
        return;
    }
}

class School {
    constructor(ages) {
        this.fishes = ages.map(age => new Fish(age));
    }

    checkFish() {
        this.fishes.filter(fish => fish.timer === 0).forEach(() => this.createFish())
    }

    createFish() {
        const newFish = new Fish(9);
        this.fishes.push(newFish);
    }

    ageFish() {
        this.fishes.forEach(fish => fish.age())
    }
}

const parseData = data.split(',').map(Number);
const school = new School(parseData)

function printAges(school) {
    return school.fishes.map(el => el.timer);
}
// school.checkFish();
// console.log(printAges(school))
// school.ageFish();
// console.log(printAges(school))
// school.checkFish();
// console.log(printAges(school))

const days = 80;

for (let i = 1; i < days; i++) {
    // console.log(`days: `, i)
    school.ageFish();
    // console.log(printAges(school))
    school.checkFish();
    // console.log(printAges(school))
}

console.log(school.fishes.length)

const arr = Array(9).fill(0);
parseData.forEach(el => arr[el] += 1)
let reducer = arr;
for (let i = 1; i < 257; i++) {
    console.log('After ', i, 'Days')
    const copy = reducer.map(el => el);
    reducer.forEach((fish, i) => {
        if (i === 8) {
            reducer[i] = copy[0];
            return;
        }
        reducer[i] = copy[i + 1];
        if (i === 6) {
            reducer[i] += copy[0]
            // console.log(copy)
            // console.log(reducer)
            // console.log(copy[i])
            // reducer[i - 1] += reducer[i];
            return;
        }
    })
    // console.log(reducer)
    console.log(reducer.reduce((acc, curr) => acc + curr))
}
console.log(reducer.reduce((acc, curr) => acc + curr))