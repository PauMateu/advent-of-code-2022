const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalVisible = 0;

const checkIfVisible = (tree, compare) => {
    return (parseInt(tree) > parseInt(compare))
};

//A bit ugly but it does the job
for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[0].length - 1; j++) {
        let tree = input[i][j];
        let visible = true;
        //top
        for (let index = 0; index < i; index++) {
            visible = visible && checkIfVisible(tree, input[index][j]);
        }
        if (visible) {
            totalVisible++;
            continue;
        }
        visible = true;
        //right
        for (let index = j + 1; index < input[0].length; index++) {
            visible = visible && checkIfVisible(tree, input[i][index]);
        }
        if (visible) {
            totalVisible++;
            continue;
        }
        visible = true;
        //botton
        for (let index = i + 1; index < input.length; index++) {
            visible = visible && checkIfVisible(tree, input[index][j]);
        }
        if (visible) {
            totalVisible++;
            continue;
        }
        visible = true;
        //left
        for (let index = 0; index < j; ++index) {
            visible = visible && checkIfVisible(tree, input[i][index]);
        }
        if (visible) {
            totalVisible++;
            continue;
        }
    }
}
console.log(totalVisible + input.length * 4 - 4);