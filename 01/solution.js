const fs = require('fs');
const input = fs.readFileSync('./01/input').toString();

function mapInput(input) {
    return input
        .split('\r\n\r\n')
        .map(e => e.split('\r\n').map(Number));
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(elves) {
    let elvesFood = elves.map(e => e.reduce((sum, number) => sum + number), 0);
    return Math.max(...elvesFood);
}

function secondStage(elves) {
    let sum = 0;
    let elvesFood = elves.map(e => e.reduce((sum, number) => sum + number), 0);
    for (let i = 0; i < 3; i++) {
        const bestElf = Math.max(...elvesFood);
        sum = sum + bestElf;
        elvesFood = elvesFood.filter(e => e !== bestElf);
    }
    return sum;
}

solution(mapInput(input));