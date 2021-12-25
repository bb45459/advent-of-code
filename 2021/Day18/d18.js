const fs = require("fs");
// const input = fs.readFileSync("./input.txt", "utf-8");

const mock = `[1,2]
[[1,2],3]
[9,[8,7]]
[[1,9],[8,5]]
[[[[1,2],[3,4]],[[5,6],[7,8]]],9]
[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]`;

const mock2 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`;
// [6,6]`;

const data = mock2;
const split = data.split('\n').map(JSON.parse)
console.log(split)

function addTwoNumbers(x, y) {
    return [x, y]
}

function reduceNumber(x, arr, path) {
    // if pair nested inside 4 pairs explode
    let newArr = arr;
    x.forEach((el, i) => {
        console.log('el, path', el, path)
        const localPath = [...path, i];
        if (Array.isArray(el) && localPath.length < 4) {
            reduceNumber(el, arr, localPath);
        } else if (Array.isArray(el) && localPath.length === 4) {
            console.log('explode');
            newArr = explodePair(arr, el, localPath)
            console.log(`newArr`, JSON.stringify(newArr))
        } else if (el >= 10) {
            console.log('split')
            // if regular number >= 10 leftmost reg number splits
            const split = splitRegularNumber(el);
            switch (localPath.length) {
                case 1:
                    newArr[path[0]] = split;
                    break;
                case 2:
                    newArr[path[0]][path[1]] = split;
                    break;
                case 3:
                    newArr[path[0]][path[1]][path[2]] = split;
                    break;
                case 4:
                    newArr[path[0]][path[1]][path[2]][path[3]] = split;
                    break;
            }
        }
    })
    return newArr;

    // if no actions then done
}
const arr = [[[[[9, 8], 1], 2], 3], 4];
// console.log(reduceNumber(arr,arr, []))

function explodePair(arr, pair, path) {
    console.log('path', path)
    console.log(`pair`, pair)
    // pair's left value is added to the first regular number to the left of the exploding pair (if any)
    // if (arr[path[0]][path[1]][path[2]][path[3]][0]) {
    //     arr[path[0]][path[1]][path[2]][path[3]][0][1] += pair[1]
    //     console.log('case3.6')
    // }
    // // else if (path[3] === 1 && !Array.isArray(arr[path[0]][path[1]][path[2]][0])) {
    // //     console.log('case1.1')
    // //     arr[path[0]][path[1]][path[2]][0] += pair[0]
    // // }
    // else if (!Array.isArray(arr[path[0]][path[1]][path[2]][0])) {
    //     console.log('case1')
    //     arr[path[0]][path[1]][path[2]][0] += pair[0]
    // }
    // else if (!Array.isArray(arr[path[0]][path[1]][0])) {
    //     console.log('case2')
    //     arr[path[0]][path[1]][0] += pair[0]
    // }
    // else if (!Array.isArray(arr[path[0]][0])) {
    //     console.log('case3')
    //     arr[path[0]][0] += pair[0]
    // }
    // // pair's right value is added to the first regular number to the right of the exploding pair (if any)
    // if (arr[path[0]][path[1]][path[2]][path[3]][1]) {
    //     console.log('case3.5')
    //     console.log(arr[path[0]][path[1]][path[2]][path[3]])
    //     arr[path[0]][path[1]][path[2]][path[3]][1][0] += pair[1]
    //     console.log(JSON.stringify(arr))
    // }
    // else if (path[3] === 0 && Array.isArray(arr[path[0]][path[1]][path[2]][1])) {
    //     console.log('case1.2')
    //     console.log(arr[path[0]][path[1]][path[2]][path[3]])
    //     arr[path[0]][path[1]][path[2]][1][0] += pair[1]
    // }
    // else if (!Array.isArray(arr[path[0]][path[1]][path[2]][1])) {
    //     console.log('case4')
    //     arr[path[0]][path[1]][path[2]][1] += pair[1]
    // }
    // else if (!Array.isArray(arr[path[0]][path[1]][1])) {
    //     console.log('case5')
    //     arr[path[0]][path[1]][1] += pair[1]
    // }
    // else if (!Array.isArray(arr[path[0]][1])) {
    //     console.log('case6')
    //     arr[path[0]][1] += pair[1]
    // }



    const firstOne = path.findIndex(el => el === 1);
    // if all ones then we can explode to 1,1,1,0
    // if all zeros then we can explode to 0,0,0,1
    // if  0001 the explode to 0000 and 0010
    // if 0010 then explode to 0001 and 0011
    // if 0100 then explode to 0101 and 0011 [[y,[[[x],0101],y]],y]
    const left = pair[0];
    const right = pair[1];

    if (path[3] === 1) {
        // right explode is the hard one
        // easy side
        if (Array.isArray(arr[path[0]][path[1]][path[2]][Math.abs(path[3] - 1)])) {
            arr[path[0]][path[1]][path[2]][Math.abs(path[3] - 1)][1] += right
        } else {
            arr[path[0]][path[1]][path[2]][Math.abs(path[3] - 1)] += right
        }
        // hard side
        if (!Array.isArray(arr[path[0]][Math.abs(path[1] - 1)])) {
            arr[path[0]][Math.abs(path[1] - 1)] += right
        }
        else if (!Array.isArray(arr[path[0]][path[1]][Math.abs(path[1] - 1)])) {
            arr[path[0]][Math.abs(path[1] - 1)][1] += right
        }
    } else if (path[3] === 0) {
        // left explode is the hard one
        if (Array.isArray(arr[path[0]][path[1]][path[2]][Math.abs(path[3] - 1)])) {
            arr[path[0]][path[1]][path[2]][Math.abs(path[3] - 1)][0] += left
        } else {
            arr[path[0]][path[1]][path[2]][Math.abs(path[3] - 1)] += left
        }
    }

    // Then, the entire exploding pair is replaced with the regular number 0.
    console.log(arr[path[0]][path[1]][path[2]][path[3]])
    arr[path[0]][path[1]][path[2]][path[3]] = 0;
    console.log('after explode', JSON.stringify(arr))
    return arr;
}

const beforeExplode = [[[[[9, 8], 1], 2], 3], 4];
const afterExplode = [[[[0, 9], 2], 3], 4];

function splitRegularNumber(x) {
    // replace it with a pair
    // the left element of the pair should be the regular number divided by two and rounded down 
    // while the right element of the pair should be the regular number divided by two and rounded up.
    // 10 becomes [5,5], 11 becomes [5,6], 12 becomes [6,6]
    return [Math.floor(x / 2), Math.ceil(x / 2)]
}

function checkMagnitude(x) {
    // The magnitude of a pair is 3 times the magnitude of its left element plus 2 times the magnitude of its right element
    // the magnitude of a regular number is just that number.
    // the magnitude of [9,1] is 3*9 + 2*1 = 29
    // [1,9] is 3*1 + 2*9 = 21
    // magnitude of [[9,1],[1,9]] is 3*29 + 2*21 = 129
}

// [[[[4,3],4],4],[7,[[8,4],9]]] + [1,1]
// const added = addTwoNumbers([[[[4, 3], 4], 4], [7, [[8, 4], 9]]], [1, 1])
// console.log(JSON.stringify(added))
// const reduced = reduceNumber(added, added, []);
// console.log(JSON.stringify(reduced))

const reduced = split.reduce((acc, curr) => {
    let added = addTwoNumbers(acc, curr);
    let copy = added.map(el => el);
    do {
        copy = added.map(el => el);
        added = reduceNumber(added, added, []);
        console.log(`reduced`, JSON.stringify(added))
    } while (JSON.stringify(added) !== JSON.stringify(copy))
    return added;
})

console.log(JSON.stringify(reduced))