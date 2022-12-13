const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalPoints = 0;

const calcPairPoints = (pair) => {
    let oponent = pair.charAt(0);
    let myself = pair.charAt(2);
    if (myself == "X") {
        totalPoints += 0;
        switch (oponent) {
            case "A":
                totalPoints += 3;
                break;
            case "B":
                totalPoints += 1;
                break;
            case "C":
                totalPoints += 2;
                break;
            default:
                break;
        }
    } else if (myself == "Y") {
        totalPoints += 3;
        switch (oponent) {
            case "A":
                totalPoints += 1;
                break;
            case "B":
                totalPoints += 2;
                break;
            case "C":
                totalPoints += 3;
                break;
            default:
                break;
        }
    } else if (myself == "Z") {
        totalPoints += 6;
        switch (oponent) {
            case "A":
                totalPoints += 2;
                break;
            case "B":
                totalPoints += 3;
                break;
            case "C":
                totalPoints += 1;
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