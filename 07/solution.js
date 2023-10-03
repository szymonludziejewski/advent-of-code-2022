const fs = require('fs');
const input = fs.readFileSync('./07/input').toString();
const _ = require("lodash");

function mapInput(input) {
    return buildTreeDirectory(input.split('\r\n'));
}

function solution(input) {
    console.log(firstStage(input));
    console.log(secondStage(input));
}

function firstStage(input) {
    return sumAtMost100000(input);
}

function secondStage(input) {
    const directoriesToRemove = findDirectoriesToRemove(input, input.size);

    return Math.min(...directoriesToRemove);
}

function findDirectoriesToRemove(input, spaceUsed) {
    const sizes = [];
    const totalDiskSpace = 70000000;
    const minimumDiskSpace = 30000000;
    
    if(input.isFile) {
        return [];
    }

    if(totalDiskSpace - (spaceUsed - input.size) >= minimumDiskSpace) {
        sizes.push(input.size);
    }

    const subfoldersArray = [];
    Object.keys(input).forEach((e) => {
        if(typeof input[e] === 'object') {
            subfoldersArray.push(...findDirectoriesToRemove(input[e], spaceUsed));
        }
    })

    return [...sizes, ...subfoldersArray];
}


function sumAtMost100000(treeDirectory) {
    if (treeDirectory.isFile) {
        return 0;
    }

    const directoriesNames = Object.keys(treeDirectory);
    let partialSum = 0;
    for(let name of directoriesNames) {
        partialSum += sumAtMost100000(treeDirectory[name]);
    }

    if (treeDirectory.size <= 100000) {
        return treeDirectory.size + partialSum;
    } else {
        return 0 + partialSum;
    }
}

function buildTreeDirectory(lines) {
    const treeDirectory = {
        '/': {}
    }
    let currentPath = ['/'];

    lines.forEach((line, index) => {
        if (line[0] === '$') {
            const command = line.split(' ');
            if(command[1] === 'cd') {
                if (command[2] === '..') {
                    currentPath.pop();
                } else if (command[2] === '/') {
                    currentPath = [currentPath[0]];
                } else {
                    currentPath.push(command[2]);
                }
            } else if (command[1] === 'ls') {
                lines.slice(index + 1).some(listLine => {
                    if(listLine[0] === '$') {
                        return true;
                    }
                    const ll = listLine.split(' ');
                    const filename = ll[1].replaceAll('.', '_');
                    if(ll[0] === 'dir') {
                        _.set(treeDirectory, `${currentPath.join('.')}.${filename}`, {});
                    } else {
                        _.set(treeDirectory, `${currentPath.join('.')}.${filename}`, {isFile: true, size: Number(ll[0])});
                    }
                })
            }
        }
    });
    fillDirectoriesWithSize(treeDirectory);
    return treeDirectory
}

function fillDirectoriesWithSize(treeDirectory) {
    if (treeDirectory.size) {
        return treeDirectory.size;
    }

    const directoriesNames = Object.keys(treeDirectory);
    treeDirectory.size = directoriesNames.reduce((partialSum, e) => {
        const elementToAdd = typeof(treeDirectory[e]) === 'object' ? fillDirectoriesWithSize(treeDirectory[e]) : 0;
        return partialSum + elementToAdd;
    }, 0);
    return treeDirectory.size;
}



solution(mapInput(input));
// console.log(mapInput(input));