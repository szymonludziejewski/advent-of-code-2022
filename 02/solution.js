const fs = require('fs');
const input = fs.readFileSync('./02/input').toString();

function mapInput(input) {
    return input
        .split('\r\n')
        .map(e => e.split(' '));
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    const points = input.map(e => firstStageMapping[e[0]][e[1]]);
    return points.reduce((partialSum, e) => partialSum + e);
}

function secondStage(input) {
    const shouldBe = input.map(e => [e[0], secondStageMapping[e[1]][e[0]]])
    const points = shouldBe.map(e => firstStageMapping[e[0]][e[1]]);
    return points.reduce((partialSum, e) => partialSum + e);
}

const firstStageMapping = {
    'A': {
        'X':1 + 3,
        'Y':2 + 6,
        'Z':3 + 0
    },
    'B': {
        'X':1 + 0,
        'Y':2 + 3,
        'Z':3 + 6
    },
    'C': {
        'X':1 + 6,
        'Y':2 + 0,
        'Z':3 + 3
    }
}

const secondStageMapping = {
    'X': {
        'A': 'Z',
        'B': 'X',
        'C': 'Y',
    },
    'Y': {
        'A': 'X',
        'B': 'Y',
        'C': 'Z',
    },
    'Z': {
        'A': 'Y',
        'B': 'Z',
        'C': 'X',
    },
}

solution(mapInput(input));
// console.log(mapInput(input));