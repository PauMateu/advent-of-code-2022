const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalOverlapped = 0;

input.forEach(pair => {
    let [firstPair, secondPair] = pair.split(",");
    let firstPairArr = firstPair.split("-").map((x) => parseInt(x));
    let secondPairArr = secondPair.split("-").map((x) => parseInt(x));
    if (secondPairArr[0] < firstPairArr[0]) {
        let temp = firstPairArr;
        firstPairArr = secondPairArr;
        secondPairArr = temp;
    }
    if (secondPairArr[0] >= firstPairArr[0] && secondPairArr[0] <= firstPairArr[1]) {
        totalOverlapped++;
    }
});

console.log(totalOverlapped);