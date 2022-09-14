export function addDotsBigNum (num) {
    if (num.length > 4) {
        return num.replace(' ', '').slice(0,2)+'..'
    }
    return num
}