export function pad_with_zeroes(number, length = 8) {

    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;

}
export function currencyConverter(numStr, currency) {
    if(currency !== 'R$') return numStr;
    let isNegative = false;
    if (parseFloat(numStr) < 0) {
        isNegative = true;
        numStr = parseFloat(numStr) * -1;
    }
    let strng = numStr.toString().replace('.', ',');
    let data = strng.split(',')[0];
    let remainingPart = strng.split(',')[1];

    if (remainingPart === undefined || remainingPart === "") {
        remainingPart = '00';
    }

    let dataArray = data.split("");
    dataArray = dataArray.reverse();

    let resultantArray = [];
    dataArray.forEach((ele, i) => {
        if (i % 3 === 0 && i !== 0) { resultantArray.push('.') }
        resultantArray.push(ele);
    });
    if (remainingPart.length === 1) remainingPart = remainingPart + '0';
    else if (remainingPart.length === 0) remainingPart = '00';
    let result = resultantArray.reverse().join("") + "," + remainingPart.substr(0, 2);
    if (isNegative) {
        result = '(' + result + ')';
    }
    return result;
}
export const truncSentence = (sentence, truncNum = 24) => {
    return sentence.length > (truncNum + 2) ? sentence.substr(0, truncNum) + '...' : sentence;
}

export const hasValidCharacters = (value) => {
    if (!value) return "";
    value = value.replace(/["]+/g, '')
    // eslint-disable-next-line
    var s = "!@#$%^&*()+=[]\\\';,.{}|\"\”:<>?/";
    for (var i = 0; i < value.length; i++) {
        if (s.indexOf(value.charAt(i)) !== -1) {
            return false;
        }
    }
    return true;
}

export const removeSpecialCharacters = (value) => {
    if (!value) return "";
    value = value.replace(/["]+/g, '')
    // eslint-disable-next-line
    var s = "!@#$%^&*()+=[]\\\';,.{}|\"\”:<>?/";
    let finalString = "";
    for (var i = 0; i < value.length; i++) {
        if (s.indexOf(value.charAt(i)) !== -1) {

        } else {
            finalString += value.charAt(i);
        }
    }
    return finalString;
}