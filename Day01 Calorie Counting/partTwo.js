const fs = require("fs")
const path = require("path")

let raw_input = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");
let top3 = [-1, -1, -1];
let current = 0;

input.forEach(n => {
    if (n == "") {
        let topLenght = top3.length - 1;
        for (let i = topLenght; i >= 0; --i) {
            if(current > top3[i]){
                top3.splice(i+1, 0, current)
                top3 = top3.slice(1,4)
                break;
            }
        }
        current = 0;
    }
    else {
        current += parseInt(n);
    }
})
console.log(top3.reduce((partialSum, a) => partialSum + a, 0));

