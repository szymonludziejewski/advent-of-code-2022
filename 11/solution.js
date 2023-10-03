const fs = require('fs');
const input = fs.readFileSync('./11/input').toString();
const _ = require("lodash");

function mapInput(input) {
    const monkeys = input.split('\r\n\r\n').map(monkey => monkey.split('\r\n'));
    const output = monkeys.map(monkey => {
        return {
            items: monkey[1].split(':')[1].split(',').map(Number),
            inspections: 0,
            operation: monkey[2].split(':')[1].replaceAll('old', 'itemToInspect').replaceAll('new', 'itemToInspect'),
            test: {
                divisible: Number(monkey[3].split(' ')[5]),
                ifTrue: Number(monkey[4].substr(-1)),
                ifFalse: Number(monkey[5].substr(-1)),
            },

        }
    })
    // return {output, monkeys};
    moduloNumber = output.reduce((partialMultiply, monkey) => partialMultiply * monkey.test.divisible, 1);
    return output.map(e => {
        e.test.moduloNumber = moduloNumber;
        return e
    });
}

function solution(input) {
    // console.log(firstStage(_.cloneDeep(input)));
    console.log(secondStage(_.cloneDeep(input)));
}

function firstStage(input) {
    const rounds = 20; 
    for (let i = 0; i < rounds; i++) {
        input.forEach(monkey => {
            while(monkey.items.length) {
                let itemToInspect = monkey.items.shift();
                monkey.inspections++;

                eval(monkey.operation);
                
                itemToInspect = Math.floor(itemToInspect / 3);

                if(itemToInspect % monkey.test.divisible === 0) {
                    input[monkey.test.ifTrue].items.push(itemToInspect);
                } else {
                    input[monkey.test.ifFalse].items.push(itemToInspect);
                }
            }
        });
    }
    return input;
}

function secondStage(input) {
    const rounds = 10000; 
    for (let i = 0; i < rounds; i++) {
        input.forEach(monkey => {
            while(monkey.items.length) {
                let itemToInspect = monkey.items.shift();
                monkey.inspections++;

                eval(monkey.operation);
                
                itemToInspect = itemToInspect % monkey.test.moduloNumber; // mulltiplication of all dividers

                if(itemToInspect % monkey.test.divisible === 0) {
                    input[monkey.test.ifTrue].items.push(itemToInspect);
                } else {
                    input[monkey.test.ifFalse].items.push(itemToInspect);
                }
            }
        });
    }
    return input;
}

solution(mapInput(input));
// console.log(mapInput(input));