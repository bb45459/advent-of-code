const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf-8");

const input = data.split("\n").map((el) => {
  const tuple = el.split(" ");
  return [tuple[0], Number(tuple[1])];
});

const part1 = input.filter(el => el[0] !== '').reduce(
  (acc, curr) => {
    if (curr[0] === "forward") {
      return {
        ...acc,
        horizontal: acc.horizontal + curr[1],
      };
    }
    return {
      ...acc,
      depth: curr[0] === "up" ? acc.depth - curr[1] : acc.depth + curr[1],
    };
  },
  {
    horizontal: 0,
    depth: 0,
  }
);

console.log('part1', part1.depth * part1.horizontal)

const part2 = input.filter(el => el[0] !== '').reduce((acc, curr) => {
  if (curr[0] === "forward") {
    const newDepth = acc.aim * curr[1];
    return {
      ...acc,
      depth: acc.depth + newDepth,
      horizontal: acc.horizontal + curr[1],
    };
  }
  const newAim = curr[0] === "up" ? acc.aim - curr[1] : acc.aim + curr[1]
  return {
    ...acc,
    aim: newAim
  };
},
  {
    horizontal: 0,
    depth: 0,
    aim: 0
  })

console.log(`part2`, part2.depth * part2.horizontal)