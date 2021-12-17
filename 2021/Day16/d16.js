const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const mock2021Literal = `110100101111111000101000`;
const mockOperator1 = `00111000000000000110111101000101001010010001001000000000`;
const mockHex = '8A004A801A8002F478';
const mockHex2 = '620080001611562C8802118E34';
const mockHex3 = 'C0015000016115A2E0802F182340';
const mockHex4 = 'A0016C880162017C3686B18A3D4780';

const sumOf1and2 = 'C200B40A82'; // 3
const productOf6and9 = '04005AC33890'; // 54
const minOf7and8and9 = '880086C3E88112'; // 7
const maxOf7and8and9 = 'CE00C43D881120'; // 9
const fiveLessThan15 = 'D8005AC2A8F0'; // 1
const fiveNotGreaterThan15 = 'F600BC2D8F'; // 0
const fiveNotEqualTo15 = '9C005AC2F8F0'; // 0
const onePlus3Equals2Times2 = '9C0141080250320F1802104A08'; // 1

const data = onePlus3Equals2Times2;

// trailing zeroes don't count
// first 3 bits version - binary
// next 3 type id - binary
// id = 4 means literal value which is a single binary number
// rest is groups of 4 bits with a leading 1 or 0
// 1 means not last group
// 0 means last group

// anything other than id 4 is operator
// bit right after ID is length type id
// length type 0 - next 15 bits are total length of subpackets
// length type 1 - next 11 bits are total number of subpackets
// each sub packet follows the same rules as version type groups

const commands = {
    '0': 'sum',
    '1': 'product',
    '2': 'min',
    '3': 'max',
    '5': 'greaterThan',
    '6': 'lessThan',
    '7': 'equalTo',
}

const commandFunctions = {
    'sum': (args) => args.reduce((acc, curr) => acc + curr),
    'product': (args) => args.reduce((acc, curr) => acc * curr),
    'min': (args) => Math.min(...args),
    'max': (args) => Math.max(...args),
    'greaterThan': (x) => x[0] > x[1] ? 1 : 0,
    'lessThan': (x) => x[0] < x[1] ? 1 : 0,
    'equalTo': (x) => x[0] === x[1] ? 1 : 0
}

class StateMachine {
    constructor(input) {
        this.data = input.split('');
        this.position = 0;
        this.state = 'version';
        this.versions = [];
        this.registers = [];
        this.commands = [];
        this.subpackets = [];
        this.lengthType = '';
        this.packetCount = 0;
        this.ans = 0;
    }

    iterate() {
        // console.log(this.state, this.position)
        if (this.data.slice(this.position).every(el => el === '0')) { this.state = 'end'; return; }
        switch (this.state) {
            case 'version':
                const version = this.data.slice(this.position, this.position + 3);
                this.versions.push(version)
                this.position += 3;
                this.state = 'type';
                break;
            case 'type':
                const type = this.data.slice(this.position, this.position + 3)
                if (type.join('') === '100') {
                    // console.log('literal')
                    this.state = 'literal';
                } else {
                    const command = commands[parseInt(type.join(''), 2).toString()];
                    this.commands.push(command);
                    // console.log(command)
                    this.state = 'operational'
                }
                this.position += 3;
                break;
            case 'literal':
                let newNum = '';
                if (this.data[this.position] === '0') {
                    // console.log('last group')
                    // last group
                    newNum += this.data.slice(this.position + 1, this.position + 5).join('');
                    this.registers.push(newNum);
                    this.commands.push(parseInt(newNum, 2));
                    this.position += 5;
                    this.state = 'version';
                } else {
                    newNum += this.data.slice(this.position + 1, this.position + 5);
                    // hop 5 until last group
                    this.position += 5;
                }
                break;
            case 'operational':
                this.state = 'lengthType';
                break;
            case 'lengthType':
                if (this.data[this.position] === '0') {
                    // console.log('absolute length')
                    // next 15 bits are total length of subpackets
                    const subpacketLength = parseInt(this.data.slice(this.position + 1, this.position + 15 + 1).join(''), 2)
                    console.log(`subpacketLength`, subpacketLength)
                    this.packetCount = subpacketLength;
                    this.subpackets.push(this.packetCount)
                    this.lengthType = '0';
                    this.position += 15 + 1;
                    this.state = 'version';
                } else {
                    // console.log('packet number length')
                    // next 11 bits are the number of subpackets
                    const numSubpackets = parseInt(this.data.slice(this.position + 1, this.position + 11 + 1).join(''), 2)
                    console.log(`numSubpackets`, numSubpackets)
                    this.lengthType = '1';
                    this.packetCount = numSubpackets;
                    this.subpackets.push(this.packetCount)
                    this.position += 11 + 1;
                    this.state = 'version'
                }
                break;
        }
    }

    executeCommands() {
        this.commands.reverse();
        let numBuffer1 = [];
        let numBuffer2 = [];
        this.commands.reduce((acc, curr, i, a) => {
            console.log('1', numBuffer1, ' - 2', numBuffer2)
            if (Number.isInteger(curr)) {
                numBuffer1.unshift(curr)
            } else {
                if (numBuffer1.length === 0) {
                    const res = commandFunctions[curr](numBuffer2)
                    console.log(curr, numBuffer2)
                    numBuffer2 = [res];
                } else if (numBuffer1.length === 1) {
                    const res = commandFunctions[curr]([...numBuffer1, ...numBuffer2])
                    console.log(curr, numBuffer2)
                    numBuffer1 = []
                    numBuffer2 = [res];
                } else {
                    const res = commandFunctions[curr](numBuffer1)
                    console.log(curr, numBuffer1)
                    numBuffer1 = []
                    numBuffer2.unshift(res);
                }
            }
        }, [])
        this.ans = numBuffer2;
    }
}

const mapper = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
}

function parseHexIntoBinaryString(str) {
    const binaryParse = [];
    for (let i = 0; i < str.length; i++) {
        binaryParse.push(mapper[`${str[i]}`]);
    }
    return binaryParse.join('');
}
// console.log(parseHexIntoBinaryString(data))
const parsedHex = parseHexIntoBinaryString(data)

const machine = new StateMachine(parsedHex);
const times = data.length;
for (let i = 0; i < times; i++) {
    machine.iterate();
}
// console.log(machine)
const part1 = machine.versions.filter(el => el.length === 3).reduce((acc, curr) => {
    return acc + parseInt(curr.join(''), 2);
}, 0)
console.log('part1: ', part1)

console.log(machine.commands.toString())
console.log(machine.subpackets.toString())
// machine.executeCommands();
console.log(machine.ans)