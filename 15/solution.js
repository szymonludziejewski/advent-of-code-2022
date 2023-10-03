const fs = require('fs');
const input = fs.readFileSync('./15/exinput').toString();

function mapInput(input) {
    let xMax = -Number.MAX_VALUE;
    let xMin = Number.MAX_VALUE;
    let yMax = -Number.MAX_VALUE;
    let yMin = Number.MAX_VALUE;
    return {
        positionsArray: input.split('\r\n').map(e => {
            const scan = e.split(' ');
            const sensorPosition = {
                x: getNumberFromString(scan[2]),
                y: getNumberFromString(scan[3])
            };
            const beaconPosition = {
                x: getNumberFromString(scan[8]),
                y: getNumberFromString(scan[9])
            }
            const distance = getManhattanDistance(sensorPosition, beaconPosition);
    
            xMax = Math.max(xMax, sensorPosition.x + distance , beaconPosition.x);
            xMin = Math.min(xMin, sensorPosition.x - distance, beaconPosition.x);
            yMax = Math.max(yMax, sensorPosition.y + distance, beaconPosition.y);
            yMin = Math.min(yMin, sensorPosition.y - distance, beaconPosition.y);
    
            return {
                sensorPosition,
                beaconPosition,
                distance: distance
            }
        }),
        xMax: 20,//: Math.ceil(xMax),
        xMin: 0,//: Math.floor(xMin),
        yMax: 20,//: Math.ceil(yMax),
        yMin: 0,//: Math.floor(yMin)
    }
}

function solution(input) {
    // console.log(firstStage(input)); //4229214, 5350387 and 5186480 are too low, 5540217 is too high  width is 5446246 
    console.log(secondStage(input));
}

// function firstStage(input) {
//     let rowToCheck = 2000000;
//     let numberOfFields = 0;
//     for(let i = input.xMin; i <= input.xMax; i++) {
//         if(input.positionsArray.some(positions => (positions.beaconPosition.x === i && positions.beaconPosition.y === rowToCheck) || (positions.sensorPosition.x === i && positions.sensorPosition.y === rowToCheck))) {
//             continue;
//         }

//         input.positionsArray.some(positions => {
//             if (getManhattanDistance(positions.sensorPosition, {y: rowToCheck, x: i}) <= positions.distance) {
//                 numberOfFields++;
//                 return true;
//             }
//             return false;
//         })
//     }
//     return numberOfFields;
//     // return prepareSensorsMap(input).map(e => e.join(' ')).join('\n');
// }

// function secondStage(input) {
//     // let rowToCheck = 2000000;
//     for(let rowToCheck = input.yMin; rowToCheck <= input.xMax; rowToCheck++) {
//         for(let i = input.xMin; i <= input.xMax; i++) {
//             if(input.positionsArray.some(positions => (positions.beaconPosition.x === i && positions.beaconPosition.y === rowToCheck) || (positions.sensorPosition.x === i && positions.sensorPosition.y === rowToCheck))) {
//                 continue;
//             }
            
//             if(input.positionsArray.every(positions => {
//                 if (getManhattanDistance(positions.sensorPosition, {y: rowToCheck, x: i}) > positions.distance) {
//                     return true;
//                 }
//                 return false;
//             })) {
//                 return [i, rowToCheck]
//             }
//         }
//     }
//     return [0,0];
//     return input;
// }

function secondStage(input) {

    for(let positions of input.positionsArray) {
        //setup
        const startPositionToCheck = {
            x: positions.sensorPosition.x + positions.distance + 1,
            y: positions.sensorPosition.y
        }
        const currentPositionToCheck = {
            x: startPositionToCheck.x - 1,
            y: startPositionToCheck.y + 1
        }

        //check
        while (startPositionToCheck.x !== currentPositionToCheck.x && startPositionToCheck.y !== currentPositionToCheck.y) {
            console.log(currentPositionToCheck);
            if(input.positionsArray.some(positions => {
                if (getManhattanDistance(positions.sensorPosition, currentPositionToCheck) <= positions.distance) {
                    return true;
                }
                return false;
            })) {
                continue;
            } else {
                return currentPositionToCheck;
            }

            if (currentPositionToCheck.y > positions.sensorPosition.y && currentPositionToCheck.x > positions.sensorPosition.x) {
                currentPositionToCheck.y++;
                currentPositionToCheck.x--;
            } else if (currentPositionToCheck.y < positions.sensorPosition.y && currentPositionToCheck.x < positions.sensorPosition.x) {
                currentPositionToCheck.y--;
                currentPositionToCheck.x++;
            } else if (currentPositionToCheck.y > positions.sensorPosition.y && currentPositionToCheck.x < positions.sensorPosition.x) {
                currentPositionToCheck.y--;
                currentPositionToCheck.x--;
            } else if (currentPositionToCheck.y < positions.sensorPosition.y && currentPositionToCheck.x > positions.sensorPosition.x) {
                currentPositionToCheck.y++;
                currentPositionToCheck.x++;
            }
        } 
    }
    return [0,0]; 
}

function getNumberFromString(str) {
    return Number(str.split('=')[1].replaceAll(':', '').replaceAll(',', ''))
}

function prepareSensorsMap(input) {
    const xOffset = input.xMin;
    const yOffset = input.yMin;
    const width = input.xMax - xOffset + 1;
    const height = input.yMax - yOffset + 1;
    
    const sensorsMap = new Array(height).fill().map(row => new Array(width).fill('.'));

    input.positionsArray.forEach(path => {
        sensorsMap[path.sensorPosition.y - yOffset][path.sensorPosition.x - xOffset] = 'S';
        sensorsMap[path.beaconPosition.y - yOffset][path.beaconPosition.x - xOffset] = 'B';
    })

    return sensorsMap;
}

function getManhattanDistance(sensorPosition, beaconPosition) {
    const xMax = Math.max(sensorPosition.x, beaconPosition.x);
    const xMin = Math.min(sensorPosition.x, beaconPosition.x);
    const yMax = Math.max(sensorPosition.y, beaconPosition.y);
    const yMin = Math.min(sensorPosition.y, beaconPosition.y);
    return Math.abs((xMax - xMin) + (yMax - yMin));
}

solution(mapInput(input));
// console.log(mapInput(input));