const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");

let parsedInput = [];

let maxLenght = 0;
let maxHeight = 0;
let minLenght = Infinity;
//Utils functions

const allEqual = arr => arr.every(v => v === arr[0])

const printCave = () => {
    cave.forEach(row => {
        let print = "";
        row.forEach(col => {
            switch (col) {
                case 0:
                    print += "."
                    break;
                case 1:
                    print += "#"
                    break;
                case 2:
                    print += "0"
                    break;
                default:
                    break;
            }

        });
        console.log(print);
    });
}

const addColumLeft = () => {
    cave = cave.map((row, index) => {

        pushValue = (index == (maxHeight + 2)) ? 1 : 0;
        row.unshift(pushValue);
        return row;
    })
    fallingPoint[1]++;
}
const addColumRight = () => {
    cave = cave.map((row, index) => {
        pushValue = (index == (maxHeight + 2)) ? 1 : 0;
        row.push(pushValue);
        return row;
    })
}
//Parse input and find cave lenght and height
input.forEach(line => {
    let vertices = line.split(" -> ");
    let parsedVertices = [];
    vertices.forEach(vertex => {
        let parsedV = vertex.split(",").map(n => parseInt(n));
        if (parsedV[0] > maxLenght) maxLenght = parsedV[0];
        if (parsedV[0] < minLenght) minLenght = parsedV[0];
        if (parsedV[1] > maxHeight) maxHeight = parsedV[1];
        parsedVertices.push(parsedV);
    });
    parsedInput.push(parsedVertices);
});

//create cave and cave walls
let cave = Array.from({ length: maxHeight + 1 }, e => Array((maxLenght - minLenght) + 1).fill(0));
let fallingPoint = [0, 500 - minLenght]
parsedInput.forEach(wall => {
    let prev = null;
    wall.forEach(vertex => {
        if (prev) {
            let x = [vertex[0], prev[0]].sort();
            x = x.map(x => x -= minLenght)
            let y = [vertex[1], prev[1]].sort();
            if (allEqual(y)) {
                cave[y[0]].fill(1, x[0], x[1] + 1)
            }
            else {
                for (let i = y[0]; i <= y[1]; ++i) {
                    cave[i][x[0]] = 1;
                }
            }
        }
        prev = vertex;
    })
});
cave.push(Array((maxLenght - minLenght) + 1).fill(0));
cave.push(Array((maxLenght - minLenght) + 1).fill(1));

printCave();

let counter = 0;

let fall = (point) => {
    if (point === fallingPoint && cave[point[0]][point[1]] === 2)
        return true;
    let y = point[0];
    let x = point[1];
    if (y + 1 >= cave.length) {
        return false;
    } else if (cave[y + 1][x] == 0) {
        return fall([y + 1, x])
    } else if (x - 1 < 0) {
        counter--;
        addColumLeft();
        return false;
    } else if (cave[y + 1][x - 1] == 0) {
        return (fall([y + 1, x - 1]))
    } else if (x + 1 >= cave[0].length) {
        counter--;
        addColumRight();
        return false;
    } else if (cave[y + 1][x + 1] == 0)
        return (fall([y + 1, x + 1]))
    else {
        cave[y][x] = 2;
        return false;
    }
}
let abysm = false;
while (!abysm) {
    counter++;
    abysm = fall(fallingPoint);
}

printCave();
console.log(counter - 1);
