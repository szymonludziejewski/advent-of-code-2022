const fs = require('fs');
const input = fs.readFileSync('./09/input').toString();

function mapInput(input) {
    return input.split('\r\n').map(moveData => {
        const move = moveData.split(' ');
        return {direction: move[0], steps: Number(move[1])};
    });
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    let headPosition = {x: 0, y: 0};
    let tailPosition = {x: 0, y: 0};
    const tailPositions = [];

    input.forEach(move => {
        for(let i = 0; i < move.steps; i++) {
            headPosition = moveHead(headPosition, move.direction);

            tailPosition = getCurrentTailPosition(tailPosition, headPosition);
            tailPositions.push(JSON.stringify(tailPosition));
        }
    });

    return new Set(tailPositions).size;
}

function secondStage(input) {
    let knotsPositions = new Array(10).fill({}).map(e => ({x: 0, y: 0}));
    const tailPositions = [];

    input.forEach(move => {
        for(let i = 0; i < move.steps; i++) {
            knotsPositions[0] = moveHead(knotsPositions[0], move.direction);

            for (let j = 1; j < knotsPositions.length; j++) {
                knotsPositions[j] = getCurrentTailPosition(knotsPositions[j], knotsPositions[j-1]);

                if(j === knotsPositions.length - 1) {
                    tailPositions.push(JSON.stringify(knotsPositions[j]));
                }
            }
            
        }
    });

    return new Set(tailPositions).size;
}

solution(mapInput(input));
// console.log(mapInput(input));


function moveHead(headPosition, direction) {
    switch(direction) {
        case 'U':
            headPosition.y++;
            break;
        case 'D':
            headPosition.y--;
            break;
        case 'L':
            headPosition.x--;
            break;
        case 'R':
            headPosition.x++;
            break;
    }
    return {...headPosition}
}

function getCurrentTailPosition(tailPosition, headPosition) {
    const dx = headPosition.x - tailPosition.x;
    const dy = headPosition.y - tailPosition.y;

    if (Math.abs(dx) >=2 || Math.abs(dy) >=2) {
        tailPosition.x += sign(dx);
        tailPosition.y += sign(dy);
    }
    return {...tailPosition};
}

function sign(number) {
    return !number ? 0 : (number / Math.abs(number));
}