const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let max = -1;
let current = 0;

input.forEach(n => {
    if (n == "") {
        current = 0;
    }
    else {
        current += parseInt(n);
        if (max < current)
            max = current
    }
})

