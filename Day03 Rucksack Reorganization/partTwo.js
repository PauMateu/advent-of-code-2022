const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let totalPoints = 0;
for(let i = 0; i <input.length; i = i+3){
    for (const element of input[i]) {
        if (input[i+1].indexOf(element) != -1) {
            if (input[i+2].indexOf(element) != -1) {
                let points = element.charCodeAt(0) % 97 + 1;
                if (element == element.toUpperCase()) 
                    points = element.charCodeAt(0) % 65 + 27;                totalPoints += points;
                break;
            }
        }
    }
}
console.log(totalPoints);