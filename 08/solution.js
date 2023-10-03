const fs = require('fs');
const input = fs.readFileSync('./08/input').toString();

function mapInput(input) {
    input = input.split('\r\n').map(row => row.split('').map(treeHeight => ({treeHeight: Number(treeHeight)})));

    return checkMaxInRowsAndColumns(input);
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    let sum = 0;
    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input.length; j++) {
            if (input[i][j].treeHeight > input[i][j].maxLeft ||
                input[i][j].treeHeight > input[i][j].maxRight ||
                input[i][j].treeHeight > input[i][j].maxUp ||
                input[i][j].treeHeight > input[i][j].maxDown) {
                input[i][j].isVisible = true;
                sum++; 
            } else input[i][j].isVisible = false;
        }
    }
    return sum;
}

function secondStage(input) {
    return checkAllElementsFOV(input);
}



function checkMaxInRowsAndColumns(input) {
    for(let i = 0; i < input.length; i++) {
        let currentMaxLeft = -1;
        for(let j = 0; j < input.length; j++) {
            input[i][j].maxLeft = currentMaxLeft;
            if(input[i][j].treeHeight > currentMaxLeft) {
                currentMaxLeft = input[i][j].treeHeight;
            }
        }
    }

    for(let i = 0; i < input.length; i++) {
        let currentMaxRight = -1;
        for(let j = input.length - 1; j >= 0; j--) {
            input[i][j].maxRight = currentMaxRight;
            if(input[i][j].treeHeight > currentMaxRight) {
                currentMaxRight = input[i][j].treeHeight;
            }
        }
    }

    for(let i = 0; i < input.length; i++) {
        let currentMaxUp = -1;
        for(let j = 0; j < input.length; j++) {
            input[j][i].maxUp = currentMaxUp;
            if(input[j][i].treeHeight > currentMaxUp) {
                currentMaxUp = input[j][i].treeHeight;
            }
        }
    }

    for(let i = 0; i < input.length; i++) {
        let currentMaxDown = -1;
        for(let j = input.length - 1; j >= 0; j--) {
            input[j][i].maxDown = currentMaxDown;
            if(input[j][i].treeHeight > currentMaxDown) {
                currentMaxDown = input[j][i].treeHeight;
            }
        }
    }

    return input;
}


function checkAllElementsFOV(input) {
    let max = 0;
    for(let i = 1; i < input.length - 1; i++) {
        for(let j = 1; j < input.length - 1; j++) {
            const r = checkElementFOV(input, j, i, input[i][j].treeHeight, 'R');
            const l = checkElementFOV(input, j, i, input[i][j].treeHeight, 'L');
            const d = checkElementFOV(input, j, i, input[i][j].treeHeight, 'D');
            const u = checkElementFOV(input, j, i, input[i][j].treeHeight, 'U');
            const multiply = r * l * d * u;
            input[i][j].fov = multiply;
            max = Math.max(max, multiply);
        }
    }
    return max;
}

function checkElementFOV(input, x, y, mainValue, direction) {
    switch(direction) {
        case 'R':
            return !input[y][x + 1] ? 0 : input[y][x + 1].treeHeight >= mainValue ? 1 : 1 + checkElementFOV(input, x + 1, y, mainValue, direction);
        case 'L':
            return !input[y][x - 1] ? 0 : input[y][x - 1].treeHeight >= mainValue ? 1 : 1 + checkElementFOV(input, x - 1, y, mainValue, direction);
        case 'D':
            return !input[y + 1] ? 0 : input[y + 1][x].treeHeight >= mainValue ? 1 : 1 + checkElementFOV(input, x, y + 1, mainValue, direction);
        case 'U':
            return !input[y - 1] ? 0 : input[y - 1][x].treeHeight >= mainValue ? 1 : 1 + checkElementFOV(input, x, y - 1, mainValue, direction);
    }
}

solution(mapInput(input));
// console.log(mapInput(input));