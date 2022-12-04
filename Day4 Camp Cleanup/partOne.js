const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalContained = 0;

input.forEach(pair => {
    let [firstPair, secondPair] = pair.split(",");
    let firstPairArr = firstPair.split("-").map((x) => parseInt(x));
    let secondPairArr = secondPair.split("-").map((x) => parseInt(x));
    if (firstPairArr[0] >= secondPairArr[0] && firstPairArr[1] <= secondPairArr[1]) {
        totalContained++;
    } else if (secondPairArr[0] >= firstPairArr[0] && secondPairArr[1] <= firstPairArr[1]) {
        totalContained++;
    }
});

console.log(totalContained);