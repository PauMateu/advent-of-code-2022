const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let maximum = 0;

const checkIfVisible = (tree, compare) => {
    return (parseInt(tree) > parseInt(compare))
};
//A bit ugly but it does the job

for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[0].length - 1; j++) {
        let tree = input[i][j];
        //top
        let topValue = 0;
        for (let index = i-1; index >= 0; index--) {
            topValue++;
            if (!checkIfVisible(tree, input[index][j])) {
                break;
            };
        }
        //right
        let rightValue = 0;
        for (let index = j + 1; index < input[0].length; index++) {
            rightValue++;
            if (!checkIfVisible(tree, input[i][index])) {
                break;
            };
        }

        //bottom
        let bottomValue = 0;
        for (let index = i + 1; index < input.length; index++) {
            bottomValue++;
            if (!checkIfVisible(tree, input[index][j])) {
                break;
            };
        }

        //left
        let leftValue = 0;
        for (let index = j-1; index >= 0; index--) {
            leftValue++;
            if (!checkIfVisible(tree, input[i][index])) {
                break;
            };
        }
        let scenicScore = topValue * rightValue * bottomValue * leftValue;

        if(scenicScore > maximum)
            maximum = scenicScore;
    }
}
console.log(maximum);