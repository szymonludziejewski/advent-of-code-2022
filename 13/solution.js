const fs = require('fs');
const input = fs.readFileSync('./13/input').toString();

function mapInput(input) {
    return {
        firstStage: input.split('\r\n\r\n').map(e => {
            const packets = e.split('\r\n').map(f => eval(f))
            return {
                left: packets[0],
                right: packets[1]
            }
        }),
        secondStage: input.replaceAll('\r\n\r\n', '\r\n').split('\r\n').map(f => eval(f))
    };
}

function solution(input) {
    console.log(firstStage(input.firstStage));
    console.log(secondStage(input.secondStage));
}

function firstStage(input) {
    let sum = 0;
    input.forEach((packet, index) => {
        let checkPair = isLeftRightInCorrectOrder(packet.left, packet.right)
        if (checkPair !== -1) {
            sum = sum + index + 1;
        }
    })
    return sum;
}

function secondStage(input) {
    let first = [[2]];
    let second = [[6]]
    input.push(first, second)
    let array = input.sort((a,b) => isLeftRightInCorrectOrder(b,a));
    array = array.map(e => JSON.stringify(e));
    array.indexOf(JSON.stringify(first))
    return (array.indexOf(JSON.stringify(first)) + 1) * (array.indexOf(JSON.stringify(second)) + 1);
}


function isLeftRightInCorrectOrder(left, right) {
    if (typeof left === "number" && typeof right === "number") {
        if (left === right) {
            return 0;
            
        } else if (left < right) {
            return 1;
        }
        return -1; 
    } else if (typeof left === "object" && typeof right === "object") {
        const length = Math.max(left.length, right.length); 
        for (let i = 0; i < length; i++) {
            if(typeof left[i] === 'undefined') {
                return 1;
            }
            if(typeof right[i] === 'undefined') {
                return -1;
            }

            const check = isLeftRightInCorrectOrder(left[i], right[i])
            if(check) {
                return check;
            }
        }
        return 0;
    } else if (typeof left === "object" && typeof right === "number") {
        return isLeftRightInCorrectOrder(left, [right])
    } else if (typeof left === "number" && typeof right === "object") {
        return isLeftRightInCorrectOrder([left], right)
    }
    return -1;
}

solution(mapInput(input));
// console.log(mapInput(input));
