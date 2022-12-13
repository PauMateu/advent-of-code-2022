const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n").filter(i => i != "");

const isNumeric = (str) => {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}

const compareFunction = (l, r) => {
    left = l.split(/(\[|,|\])/g).filter(i => i != "")
    right = r.split(/(\[|,|\])/g).filter(i => i != "")
    let rightOrder = 0;
    left.every((charLeft, index) => {
        let charRight = right[index];
        if (isNumeric(charLeft) && isNumeric(charRight)) {
            if (parseInt(charLeft) > parseInt(charRight)) {
                rightOrder++;
                return false;
            } else if (parseInt(charLeft) < parseInt(charRight)) {
                rightOrder--;
                return false;
            } else {
                return true;
            }
        } else if (charLeft == "]" && (charRight == "," || isNumeric(charRight) || charRight == "[")) {
            rightOrder--;
            return false;
        } else if ((charLeft == "," || charLeft == "[" || isNumeric(charLeft)) && charRight == "]") {
            rightOrder++;
            return false;
        } else if (charLeft == "[" && isNumeric(charRight)) {
            right.splice(index + 1, 0, charRight)
            right.splice(index + 2, 0, "]")
        } else if (isNumeric(charLeft) && charRight == "[") {
            left.splice(index + 1, 0, charLeft)
            left.splice(index + 2, 0, "]")
        }
        return true
    });
    return rightOrder;
}

input.push("[[2]]")
input.push("[[6]]")
input.sort(compareFunction)
console.log(input);
let six = input.indexOf("[[6]]") + 1;
let two = input.indexOf("[[2]]") + 1;
console.log(six * two);