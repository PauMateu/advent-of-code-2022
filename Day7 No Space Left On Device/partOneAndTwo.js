const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");

let MAX_SIZE = 100000;
let sizeSum = 0;
let disk = {
    back: this,
    files: {},
    folders: {},
};
//Pointer to access different folders of the disk
let pntr = disk;
let folderSizes = [];

const changeDirectory = (dir) => {
    switch (dir) {
        case "\\":
            pntr = disk;
            break;
        case "..":
            pntr = pntr.back;
            break;
        default:
            if (pntr.folders[dir])
                pntr = pntr.folders[dir]
            break;
    }
}

//Build the disk tree
input.forEach(command => {
    command = command.split(" ");
    if (command[0] === "$") {
        if (command[1] === "cd")
            changeDirectory(command[2])
    } else {
        switch (command[0]) {
            case "dir":
                if (!pntr.folders[command[1]]) {
                    pntr.folders[command[1]] = {
                        back: pntr,
                        files: {},
                        folders: {}
                    }
                }
                break;
            default:
                if (!pntr.files[command[1]])
                    pntr.files[command[1]] = command[0]
                break;
        }
    }
});

//Iterative way to calc folder size (PART ONE)
let calcFolderSize = (folder) => {
    let fldrTotalSize = 0;
    for (const [fileName, fileSize] of Object.entries(folder.files)) {
        fldrTotalSize += parseInt(fileSize);
    }
    for (const [folderName, insideFolder] of Object.entries(folder.folders)) {
        fldrTotalSize += parseInt(calcFolderSize(insideFolder));
    }
    folderSizes.push(fldrTotalSize);
    if (fldrTotalSize <= MAX_SIZE)
        sizeSum += fldrTotalSize;
    return fldrTotalSize;
}

//PART ONE
let diskSize = calcFolderSize(disk)
console.log("Part one: ", sizeSum);

//PART TWO
let MIN_SIZE = 30000000 - (70000000 - diskSize);
let minimum = Infinity;
folderSizes.forEach(folder => {
    if (folder >= MIN_SIZE && folder < minimum)
        minimum = folder;
});
console.log("Part two; ", minimum);
