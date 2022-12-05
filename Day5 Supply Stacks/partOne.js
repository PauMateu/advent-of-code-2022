const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");

let containerShip = [];
let rowIndex = 0;
//Build conteiner ship data structure
for (rowIndex; rowIndex < input.length; ++rowIndex) {
    let row = input[rowIndex]
    if (/[0-9]/.test(row)) {
        break;
    }
    let index = 0;
    for (let i = 0; i < row.length; i += 4) {
        let container = row.slice(i, i + 3);
        let containerValue = container.replace(/[^a-zA-Z]+/g, '');
        if (containerValue) {
            containerShip[index] = containerShip[index] || [];
            containerShip[index].push(containerValue);
        }
        index++;
    }
};
for (rowIndex += 2; rowIndex < input.length; ++rowIndex) {
    let instruction = input[rowIndex].replace("move ", "").replace("from", "").replace("to", "").split("  ");
    let number = parseInt(instruction[0] );
    let from = parseInt(instruction[1] - 1);
    let to = parseInt(instruction[2] - 1);
    let containers = containerShip[from].slice(0, number).reverse();
    containerShip[from] = containerShip[from].slice(number)
    containerShip[to].unshift(...containers);
}
let finalString = "";
containerShip.forEach(container => {
    finalString += container[0];
});
console.log(finalString);