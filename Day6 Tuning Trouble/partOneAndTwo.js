const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = [...raw_input];
let buffer = input.splice(0, 13);
function hasRepeats(str) {
    return /(.).*\1/.test(str);
}
//TODO: Check if first buff is valid
for (let i = 0; i < input.length; ++i) {
    if (hasRepeats(buffer.toString().replace(/,/g,""))) {
        buffer.push(input[i]);
        buffer.shift();
    } else {
        console.log(i+14);
        break;
    }
}