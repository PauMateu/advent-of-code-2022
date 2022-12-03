const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalPoints = 0;
input.forEach(ruck => {
    let part1 = ruck.slice(0, ruck.length / 2);
    let part2 = ruck.slice(ruck.length / 2, ruck.length);
    for (const element of part1) {
        if (part2.indexOf(element) != -1) {
            let points = element.charCodeAt(0) % 97 + 1;
            if (element == element.toUpperCase()) {
                points = element.charCodeAt(0) % 65 + 27;
            }
            totalPoints += points;
            break;
        }
    };
});
console.log(totalPoints);