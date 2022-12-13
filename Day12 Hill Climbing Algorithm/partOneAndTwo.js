const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let start = [];
let end = [];
let field = [];

resetMap = () => {
    field = [];
    input.forEach((row, colIndex) => {
        parsedRow = [...row].map((value, rowIndex) => {
            if (value === "S") {
                start[0] = colIndex;
                start[1] = rowIndex;
            } else if (value === "E") {
                end[0] = colIndex;
                end[1] = rowIndex;
            }
            return (
                {
                    visited: false,
                    i: colIndex,
                    j: rowIndex,
                    value: value,
                    distance: 0
                }
            )
        })
        field.push(parsedRow)
    });
}

const isValidUpside = (destCell, currentCell) => {
    return (!destCell.visited &&
        (destCell.value.charCodeAt(0) == currentCell.value.charCodeAt(0) + 1 ||
            (destCell.value.charCodeAt(0) < currentCell.value.charCodeAt(0) && destCell.value !== "E") ||
            destCell.value.charCodeAt(0) == currentCell.value.charCodeAt(0) ||
            currentCell.value == "S" && destCell.value == "a" ||
            currentCell.value == "z" && destCell.value == "E"))
}
const isValidDownside = (destCell, currentCell) => {
    return (!destCell.visited &&
        (destCell.value.charCodeAt(0) == currentCell.value.charCodeAt(0) - 1 ||
            ((destCell.value.charCodeAt(0) > currentCell.value.charCodeAt(0)) && currentCell.value !== "E") ||
            destCell.value.charCodeAt(0) == currentCell.value.charCodeAt(0) ||
            currentCell.value == "S" && destCell.value == "a" ||
            currentCell.value == "E" && destCell.value == "z"))
}

//Implement BFS -kindof- algorithm aproach
const findShortestPath = (startCoordinates, endValue, isValid) => {
    resetMap();
    let queue = [];
    let found = false;
    let finalDistance = null;

    let visitCell = (i, j, endValue) => {
        field[i][j].visited = true;
        let cell = field[i][j];
        if (cell.value === endValue) {
            finalDistance = cell.distance;
            found = true;
        }
        let upValue = undefined;
        let botValue = undefined;
        if (i > 0)
            upValue = field[i - 1][j];
        let rightValue = field[i][j + 1];
        if (i < input.length - 1)
            botValue = field[i + 1][j];
        let leftValue = field[i][j - 1];
        if (upValue && isValid(upValue, cell)) {
            upValue.visited = true;
            upValue.distance = cell.distance + 1;
            queue.push([upValue.i, upValue.j]);
        }
        if (rightValue && isValid(rightValue, cell)) {
            rightValue.visited = true;
            rightValue.distance = cell.distance + 1;
            queue.push([rightValue.i, rightValue.j]);
        }
        if (botValue && isValid(botValue, cell)) {
            botValue.visited = true;
            botValue.distance = cell.distance + 1;
            queue.push([botValue.i, botValue.j]);
        }
        if (leftValue && isValid(leftValue, cell)) {
            leftValue.visited = true;
            leftValue.distance = cell.distance + 1;
            queue.push([leftValue.i, leftValue.j]);
        }
    }

    queue.push([startCoordinates[0], startCoordinates[1]]);

    while (queue.length > 0 && !found) {
        cellToVisit = queue.shift();
        visitCell(cellToVisit[0], cellToVisit[1], endValue)
    }

    return finalDistance;
}

console.log("Part one: ", findShortestPath(start, "E", isValidUpside));
console.log("Part two: ", findShortestPath(end, "a", isValidDownside))