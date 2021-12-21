function playDeterministic(p1Start, p2Start) {
    let p1Pos = p1Start;
    let p2Pos = p2Start;
    let p1Points = 0;
    let p2Points = 0;
    let turns = 1;
    let rolls = 1;
    while (p1Points < 1000 && p2Points < 1000) {
        if (turns % 2 === 1) {
            const roll = rolls + rolls + 1 + rolls + 2;
            console.log(`roll`, roll)
            p1Pos = (p1Pos + roll) % 10;
            p1Pos = p1Pos === 0 ? 10 : p1Pos
            p1Points += p1Pos;
        } else {
            const roll = rolls + rolls + 1 + rolls + 2;
            console.log(`roll`, roll)
            p2Pos = (p2Pos + roll) % 10;
            p2Pos = p2Pos === 0 ? 10 : p2Pos
            p2Points += p2Pos
        }
        rolls += 3;
        console.log({ p1Pos, p2Pos, p1Points, p2Points, turns, rolls })
        turns++;
    }
    return { p1Pos, p2Pos, p1Points, p2Points, turns, rolls }
}
// My input
// Player 1 starting position: 10
// Player 2 starting position: 1

// Example
// Player 1 starting position: 4
// Player 2 starting position: 8
const res = playDeterministic(10, 1);
const ans = Math.min(res.p1Points, res.p2Points) * (res.rolls - 1)
console.log('part1:', ans)
