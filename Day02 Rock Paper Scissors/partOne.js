const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalPoints = 0;

const calcPairPoints = (pair) => {
    let oponent = pair.charAt(0);
    let myself = pair.charAt(2);
    if (myself == "X") {
        totalPoints += 1;
        switch (oponent) {
            case "A":
                totalPoints += 3
                break;
            case "B":
                totalPoints += 0;
                break;
            case "C":
                totalPoints += 6;
                break;
            default:
                break;
        }
    } else if (myself == "Y") {
        totalPoints += 2;
        switch (oponent) {
            case "A":
                totalPoints += 6;
                break;
            case "B":
                totalPoints += 3;
                break;
            case "C":
                totalPoints += 0;
                break;
            default:
                break;
        }
    } else if (myself == "Z") {
        totalPoints += 3;
        switch (oponent) {
            case "A":
                totalPoints += 0;
                break;
            case "B":
                totalPoints += 6;
                break;
            case "C":
                totalPoints += 3;
                break;
            default:
                break;
        }
    }
}
input.forEach(pair => {
    calcPairPoints(pair);
});
console.log(totalPoints);