const fs = require('fs');
const input = fs.readFileSync('./12/input').toString();

function mapInput(input) {
    const outputObj = {
    }
    outputObj.localMap = input.split('\r\n').map((row,rowIndex)=> {
        return row.split('').map((place, placeIndex) => {
            if (place === 'S') {
                outputObj.startingPoint = {x: placeIndex, y: rowIndex};
                return 1;
            } else if (place === 'E') {
                outputObj.destinationPoint = {x: placeIndex, y: rowIndex};
                return 28;
            }
            return place.charCodeAt() - 95;
        });
    });
    outputObj.distanceMap = outputObj.localMap.map(row => row.map(column => Number.MAX_VALUE));
    return outputObj;
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    return treeSearch(input.destinationPoint.x, input.destinationPoint.y, 0, input.localMap, input.distanceMap, input.startingPoint);
}

function secondStage(input) {
    let minDistance = Number.MAX_VALUE;
    input.localMap.forEach((row, rowIndex) => {
        row.forEach((point, pointIndex) => {
            if(point === 2) {
                minDistance = Math.min(minDistance, input.distanceMap[rowIndex][pointIndex])
            }
        })
    })

    return minDistance;
}





function adjacentPlaces (localMap, x, y) {
    const adjacent = []
    const currentValue = getValueOfPlace(localMap, x, y);
    let compareValue = getValueOfPlace(localMap, x - 1, y);
    if (compareValue && compareValue >= currentValue - 1) {
        adjacent.push({x: x-1, y: y});
    } 

    compareValue = getValueOfPlace(localMap, x, y - 1);
    if (compareValue && compareValue >= currentValue - 1) {
        adjacent.push({x: x, y: y-1});
    }

    compareValue = getValueOfPlace(localMap, x + 1, y);
    if (compareValue && compareValue >= currentValue - 1) {
        adjacent.push({x: x+1, y: y});
    }

    compareValue = getValueOfPlace(localMap, x, y + 1, );
    if (compareValue && compareValue >= currentValue - 1) {
        adjacent.push({x: x, y: y+1});
    }
    
    return adjacent;
}

function getValueOfPlace(inputTree, x, y) {
    return inputTree[y]?.[x];
}

const treeSearch = (x, y, steps, localMap, distanceMap, destinationPoint) => {
    if (distanceMap[y][x] <= steps) {
        return;
    }
    distanceMap[y][x] = steps;

    adjacentPlaces(localMap, x, y).forEach(adj => treeSearch(adj.x, adj.y, steps+1, localMap, distanceMap, destinationPoint));
    return distanceMap[destinationPoint.y][destinationPoint.x];
}

solution(mapInput(input));
// console.log(mapInput(input));
