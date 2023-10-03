const fs = require('fs');
const input = fs.readFileSync('./05/input').toString();

function mapInput(input) {
    input = input.split('\r\n\r\n');

    const containersIn = input[0].split('\r\n').reverse();
    const containers = [];
    const indexes = containersIn.shift();

    for(let j = 0; j < 9; j++ ) {
        const indexOfStack = indexes.indexOf(`${j + 1}`); 
        const stackOfContainers = []
        for(let level of containersIn) {
            if(level[indexOfStack] !== ' ') {
                stackOfContainers.push(level[indexOfStack]);
            }
        }
        containers.push(stackOfContainers);
    }

    const moves = input[1].split('\r\n').map(e => e.split(' ')).map(e => ({howMany: Number(e[1]), from: Number(e[3]), to: Number(e[5])}));

    return {
        containers,
        moves
    };
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    const containers = input.containers.map(e => [...e]);
    input.moves.forEach(move => {
        const moveElements = []
        for(let i = 0; i < move.howMany; i++) {
            const element = containers[move.from - 1].pop();
            moveElements.push(element);
        }
        containers[move.to - 1].push(...moveElements);
    });
    return containers;
}

function secondStage(input) {
    const containers = input.containers.map(e => [...e]);
    input.moves.forEach(move => {
        const moveElements = []
        for(let i = 0; i < move.howMany; i++) {
            const element = containers[move.from - 1].pop();
            moveElements.push(element);
        }
        containers[move.to - 1].push(...moveElements.reverse());
    });
    return containers;
}

solution(mapInput(input));
// console.log(mapInput(input));