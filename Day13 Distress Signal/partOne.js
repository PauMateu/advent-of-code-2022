const fs = require("fs")
const p = require("path")

let raw_input = fs.readFileSync(p.resolve(__dirname, './input.txt'), 'utf8');
let input = raw_input.split("\n");

let rightOrder = 0;
const isNumeric = (str) => {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}

for (let i = 0; i < input.length; i += 3) {
    const l = input[i];
    const r = input[i + 1];
    left = l.split(/(\[|,|\])/g).filter(i => i != "")
    right = r.split(/(\[|,|\])/g).filter(i => i != "")

    left.every((charLeft, index) => {
        let charRight = right[index];
        if (isNumeric(charLeft) && isNumeric(charRight)) {
            if (parseInt(charLeft) > parseInt(charRight)) {
                return false;
            } else if (parseInt(charLeft) < parseInt(charRight)) {
                rightOrder += ((i + 3) / 3);
                return false;
            } else {
                return true;
            }
        } else if (charLeft == "]" && (charRight == "," || isNumeric(charRight) || charRight == "[")) {
            console.log(i);
            rightOrder += ((i + 3) / 3);
            return false;
        } else if ((charLeft == "," || charLeft == "[" || isNumeric(charLeft)) && charRight == "]") {
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

}
console.log(rightOrder);
