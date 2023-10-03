const fs = require('fs');
const input = fs.readFileSync('./06/input').toString();

function mapInput(input) {

    return input;
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    return lookForTagAfterIndex(input, 4);
}

function secondStage(input) {
    return lookForTagAfterIndex(input, 14);
}

function lookForTagAfterIndex(input, lengthOfMarker) {
    for(let i = lengthOfMarker; i < input.length; i++) {
        let chars = input.substring(i - lengthOfMarker, i).split('').sort();
        let diffLetters = true;
        for(let j = 0; j < chars.length; j++) {
            if(chars[j] === chars[j+1]) {
                diffLetters = false;
                break;
            }
        }
        if(diffLetters) {
            console.log(chars)
            return i;
        }
    }
}

solution(mapInput(input));
// console.log(mapInput(input));