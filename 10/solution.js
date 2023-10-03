const fs = require('fs');
const input = fs.readFileSync('./10/input').toString();

function mapInput(input) {
    return input.split('\r\n').map(e => {
        let espl = e.split(' ');
        let op = { operation: espl[0] }
        if(espl.length ===2) {
            op.value = Number(espl[1]);
        }
        return op;
    });
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    let x = 1;
    let cycle = 1;
    let signalStrengths = [];

    input.forEach((command) => {
        if(command.operation === 'noop') {
            cycle++;
            if ((cycle - 20) % 40 === 0) {
                signalStrengths.push(cycle * x);
            }
        } else if (command.operation === 'addx') {
            cycle++;
            
            if ((cycle - 20) % 40 === 0) {
                signalStrengths.push(cycle * x);
            }

            cycle++;
            x += command.value;

            if ((cycle - 20) % 40 === 0) {
                signalStrengths.push(cycle * x);
            }
        }
    })

    return signalStrengths.reduce((partialSum, num) => partialSum + num);
}

function secondStage(input) {
    let x = 1;
    let cycle = 1;
    let crt = [[]];
    let crtLine = 0;

    input.forEach((command) => {
        if(command.operation === 'noop') {
            crt[crtLine].push(getCurrentPixel(cycle - 1 - (crtLine * 40), x))
            if (cycle && cycle % 40 === 0) {
                crtLine++;
            }
            if(!crt[crtLine]) {
                crt.push([]);
            }
            
            cycle++;
        } else if (command.operation === 'addx') {
            crt[crtLine].push(getCurrentPixel(cycle - 1 - (crtLine * 40), x))
            if (cycle && cycle % 40 === 0) {
                crtLine++;
            }
            if(!crt[crtLine]) {
                crt.push([]);
            }
            cycle++;
            
            crt[crtLine].push(getCurrentPixel(cycle - 1 - (crtLine * 40), x))
            if (cycle && cycle % 40 === 0) {
                crtLine++;
            }
            if(!crt[crtLine]) {
                crt.push([]);
            }
            cycle++;
            x += command.value;
        }
    });

    return crt.map(e => e.join(' ')).join('\n');
}

solution(mapInput(input));
// console.log(mapInput(input));

function getCurrentPixel(crtPosition, spritePosition) {
    const spritePixels = [spritePosition - 1, spritePosition, spritePosition + 1];
    return spritePixels.some(spritePixel => spritePixel === crtPosition) ? '#' : ' '
}