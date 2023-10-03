const fs = require('fs');
const input = fs.readFileSync('./14/input').toString();
const _ = require('lodash');

function mapInput(input) {
    let xMax = 0;
    let xMin = 1000;
    let yMax = 0;
    let yMin = 1000;
    return {
        paths: input.split('\r\n').map(path => path.split(' -> ').map(cordinates => {
            const cords = cordinates.split(',').map(Number);
            const x = cords[0];
            const y = cords[1];
            xMax = Math.max(xMax, x);
            xMin = Math.min(xMin, x);
            yMax = Math.max(yMax, y);
            yMin = Math.min(yMin, y);
            return {x, y};
        })),
        xMin,
        xMax,
        yMin,
        yMax
    };
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {    
    const xOffset = input.xMin - 500;
    const yOffset = 0; //input.yMin;
    const caveMap = _.cloneDeep(prepareCaveMap(input));
    const startPoint = {
        x: 500,
        y: 0
    }
    let numberOfSandUnits = 0;
    let sandIsFallingToAbuse = false;
    while(!sandIsFallingToAbuse) {
        let sandPosition = startPoint;
        numberOfSandUnits++;
        let sandIsBlocked = false;
        while(!sandIsBlocked) {
            let newSandPosition = {...sandPosition};
            caveMap[sandPosition.y - yOffset][sandPosition.x - xOffset] = 'o';

            if (caveMap[sandPosition.y + 1 - yOffset] && caveMap[sandPosition.y + 1 - yOffset][sandPosition.x - xOffset] === '.') {
                newSandPosition.y++;
            } else if (caveMap[sandPosition.y + 1 - yOffset] && caveMap[sandPosition.y + 1 - yOffset][sandPosition.x - 1 - xOffset] === '.') {
                newSandPosition.y++;
                newSandPosition.x--;
            } else if (caveMap[sandPosition.y + 1 - yOffset] && caveMap[sandPosition.y + 1 - yOffset][sandPosition.x + 1 - xOffset] === '.') {
                newSandPosition.y++;
                newSandPosition.x++;
            }

            if(newSandPosition.x === sandPosition.x && newSandPosition.y === sandPosition.y) {
                sandIsBlocked = true;
            }

            caveMap[sandPosition.y - yOffset][sandPosition.x - xOffset] = '.';
            caveMap[newSandPosition.y - yOffset][newSandPosition.x - xOffset] = 'o';
            
            sandPosition = newSandPosition;
            
        }
        sandIsFallingToAbuse = sandPosition.y >= input.yMax;
    }

    // console.log(caveMap.map(e => e.join('')).join('\n'));
    return numberOfSandUnits - 1;
}

function secondStage(input) {
    const xOffset = input.xMin - 500;
    const yOffset = 0; //input.yMin;
    const caveMap = _.cloneDeep(prepareCaveMap(input));
    const startPoint = {
        x: 500,
        y: 0
    }
    let numberOfSandUnits = 0;
    let sandIsFallingToAbuse = false;
    while(!sandIsFallingToAbuse) {
        let sandPosition = startPoint;
        numberOfSandUnits++;
        let sandIsBlocked = false;
        while(!sandIsBlocked) {
            let newSandPosition = {...sandPosition};
            caveMap[sandPosition.y - yOffset][sandPosition.x - xOffset] = 'o';

            if (caveMap[sandPosition.y + 1 - yOffset] && caveMap[sandPosition.y + 1 - yOffset][sandPosition.x - xOffset] === '.') {
                newSandPosition.y++;
            } else if (caveMap[sandPosition.y + 1 - yOffset] && caveMap[sandPosition.y + 1 - yOffset][sandPosition.x - 1 - xOffset] === '.') {
                newSandPosition.y++;
                newSandPosition.x--;
            } else if (caveMap[sandPosition.y + 1 - yOffset] && caveMap[sandPosition.y + 1 - yOffset][sandPosition.x + 1 - xOffset] === '.') {
                newSandPosition.y++;
                newSandPosition.x++;
            }

            if(newSandPosition.x === sandPosition.x && newSandPosition.y === sandPosition.y) {
                sandIsBlocked = true;
            }

            caveMap[sandPosition.y - yOffset][sandPosition.x - xOffset] = '.';
            caveMap[newSandPosition.y - yOffset][newSandPosition.x - xOffset] = 'o';
            
            sandPosition = newSandPosition;
            
        }
        sandIsFallingToAbuse = sandIsBlocked && sandPosition.x === startPoint.x && sandPosition.y === startPoint.y//sandPosition.y === input.yMax + 2;
    }

    return numberOfSandUnits;
}

function prepareCaveMap(input) {
    const xOffset = input.xMin - 500;
    const yOffset = 0;
    const width = input.xMax - xOffset + 1000;
    const height = input.yMax - yOffset + 2;
    
    const caveMap = new Array(height).fill().map(row => new Array(width).fill('.'));

    input.paths.forEach(path => {
        let previousCords = null;
        path.forEach(cords => {
            if(previousCords) {
                for (let y = Math.min(cords.y, previousCords.y); y <= Math.max(cords.y, previousCords.y); y++) {
                    for (let x = Math.min(cords.x, previousCords.x); x <= Math.max(cords.x, previousCords.x); x++) {
                        caveMap[y - yOffset][x - xOffset] = '#';
                    }
                }
            }
            previousCords = cords;
        })
    })

    return caveMap;
}

solution(mapInput(input));
// console.log(mapInput(input));