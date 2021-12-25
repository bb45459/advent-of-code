const input = `#############
#...........#
###B#C#A#D###
  #B#C#D#A#
  #########`;

const input2 = `#############
#...........#
###B#C#A#D###
  #D#C#B#A#
  #D#B#A#C#
  #B#C#D#A#
  #########`



/**
 * 10000
 * 1000
 * 100
 * D2
 * A3
 * D3
 * A6
 * D5
 * C5
 * C5
 * B5
 * B5
 * A3
 * A8
 * 
 * D2
 * A7
 * A9
 * D5
 * D3
 * C5
 * C5
 * B5
 * B5
 * A3
 * A3
 * 11122 - too high
 * 
 */

const mock = `#############
#...........#
###B#C#B#D###
#A#D#C#A#
  #########`;

// all 4 tops can leave the room to any spot

// min energy of mock = 12521
// can't enter a goal room unless filled with own tribe
// can't stop in front of door
// what are the goals of each player?
// get out of bad room
// move towards good room
// get out of the way of players trying to get home
// cannot move once it's in the hallway unless it's to go into its room
// actions are: leave room, enter room
// we can start pruning option trees when there are no valid moves
// only 1 spot between rooms

class Game {
    constructor(rooms, players) {
        this.rooms = rooms
        this.players = players
    }

    getPlayersWithValidMoves() {
        // players that need to leave their room and aren't behind another player
        // need to leave room and no players to the left/right of entrance in hallway
        // players in hallway that can enter their goal room and aren't blocked in the hallway
        // players that are in their goal room but are blocking another player
        this.players.filter(player => player.canMove())
    }

    // try all valid moves and pass the state to a recursive call
    // if no moves and goal state not reached, return out
    // if goal state reached therefore no more moves, return out

    chooseNextMove() {

    }
}

class Room {
    constructor(initialOccupancy, doorPosition, tribe) {
        this.occupancy = initialOccupancy;
        this.doorPosition = doorPosition;
        this.tribe = tribe;
    }
}

const movementCosts = {
    a: 1,
    b: 10,
    c: 100,
    d: 1000,
}
const roomChoiceIndex = {
    a: 2,
    b: 4,
    c: 6,
    d: 8,
}

class Player {
    constructor(tribe) {
        this.tribe = tribe // string of what tribe
        this.room // string of what room they're in, null for hallway?
        this.xPosition // x position
        this.yPosition // y position
        this.energyExpended = 0;
    }

    canMove(players) {
        // check if I'm in my home
        const inHome = this.xPosition === roomChoiceIndex[this.tribe];
        // check if I'm above a foreigner
        const aboveForeigner = players.some(player => player.xPosition === this.xPosition && this.yPosition > player.yPosition && this.tribe !== player.tribe)
        // check if I'm below another 
        const belowAnother = players.some(player => player.xPosition === this.xPosition && player.yPosition > this.yPosition)
    }

    findMoves(players) {
        // check the hallway for the min and max possible safe spots
        // check if your home bucket is available
    }

    move(targetx, targety) {
        // if negative move up to 0
        // move left and right if different target x
        // move down to target y
    }
}

// minimize the distance of the largest value movers
// move the lightest things to the closest where they are't in the way
// or where they can enter after the pipe clears out