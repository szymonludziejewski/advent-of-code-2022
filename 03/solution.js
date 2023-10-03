const fs = require('fs');
const input = fs.readFileSync('./03/input').toString();

function mapInput(input) {
    const firstStageArr = input.split('\r\n')
    .map(e => {
        const halfIndex = e.length/2;
        return [e.substr(0, halfIndex), e.substr(halfIndex)];
    });
    input = input.split('\r\n')
    const secondStageArr = [];
    for(let i = 0; i < input.length; i+=3) {
        secondStageArr.push([input[i], input[i+1], input[i+2]])
    }
    return {
        firstStageArr,
        secondStageArr
    };
}

function getLetterPrioritie(letter) {
    const ASCIIcode = letter.charCodeAt(0);
    return ASCIIcode <= 90 ? ASCIIcode - 38 : ASCIIcode - 96
}

function solution(input) {
    console.log(firstStage(input.firstStageArr));
    console.log(secondStage(input.secondStageArr));
}

function firstStage(rs) {
    let priorities = rs.map(e => {
        for (let i of e[0]) {
            if(e[1].indexOf(i)>-1) {
                return getLetterPrioritie(i);
            }
        }
    })
    return priorities.reduce((sum, number) => sum + number);
}

function secondStage(rs) {
    let priorities = rs.map(e => {
        for (let i of e[0]) {
            if(e[1].indexOf(i)>-1) {
                if(e[2].indexOf(i)>-1) {
                    return getLetterPrioritie(i);
                }
            }
        }
    });
    return priorities.reduce((sum, number) => sum + number);
}

solution(mapInput(input));