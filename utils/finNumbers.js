const reverser = (num) => {
    let newNum = num.toString()
    let result = ''
    for (let i = 0; i < newNum.length; i++) {
        result += newNum[newNum.length - 1 - i]
    } return result
}

const cutter = (smth) => {
    smth = smth.toString()
    let even = ''
    for (let i = 0; i < smth.length; i++) {
        if (smth[i] === '.') {
            break;
        }
        even += smth[i]
    }
    return even
}

const spacer = (num) => {
    let currentNum = reverser(cutter(num))
    let result = ''
    for (let i = 0; i < currentNum.length; i++) {
        if (i !== 0 && currentNum[i] !== '-' && i % 3 === 0) {
            num = ' ' + currentNum[i]
        } else {
            num = currentNum[i]
        }
        result += num
    }
    return reverser(result)
}

export const addSpaceToNumber = (x) => {
    if (!/^-?\d+$/.test(x)) return 0
    x = x.toString()
    let result
    if (x.includes('.')) {
        result = spacer(x) + '.' + reverser(cutter(reverser(x)))
    } else {
        result = spacer(x)
    }
    return result
}