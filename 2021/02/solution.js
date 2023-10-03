const fs = require('fs');
const input = fs.readFileSync('./2021/02/input').toString();

function mapInput(input) {
    return input.split(' ').map(e => {
        return {
            direction: e[0],
            steps: Number(e[1])
        }
    })
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    let position = 0;
    let depth = 0;
    input.forEach(e => {
        console.log(e)
        if(e.direction === 'forward') {
            position += e.steps;
        } else if (e.direction === 'up') {
            depth -= e.steps
        } else if (e.direction === 'down') {
            depth += e.steps
        }
    });
    return {
        position,
        depth
    }
}

function secondStage(input) {
    return lookForTagAfterIndex(input, 14);
}


solution(mapInput(input));
// console.log(mapInput(input));