const fs = require('fs');
const input = fs.readFileSync('./04/input').toString();

function mapInput(input) {
    const pairs = input.split('\r\n')
    .map(e => {
        return e.split(',').map(f => {
            return f.split('-')
                .map(Number);
            
        });
            
    });
    return {
        firstStageArr: pairs,
        secondStageArr: pairs
    };
}

function solution(input) {
    console.log(firstStage(input.firstStageArr));
    console.log(secondStage(input.secondStageArr));
}

function firstStage(arr) {
    let numOfOverlapped = 0
    arr.forEach((pair => {
        const firstElf = pair[0];
        const secondElf = pair[1]
        if((firstElf[0] <= secondElf[0] && firstElf[1] >= secondElf[1]) || (secondElf[0] <= firstElf[0] && secondElf[1] >= firstElf[1])) {
            numOfOverlapped++;
        }
    }))
    return numOfOverlapped;
}

function secondStage(arr) {
    let numOfNotOverlapped = 0
    arr.forEach((pair => {
        const firstElf = pair[0];
        const secondElf = pair[1]
        if(
            (firstElf[0] < secondElf[0] && firstElf[1] < secondElf[0]) ||
            (firstElf[0] > secondElf[1] && firstElf[1] > secondElf[1])) {
            numOfNotOverlapped++;
        }
    }))
    return arr.length - numOfNotOverlapped;
}

solution(mapInput(input));
// console.log(mapInput(input));