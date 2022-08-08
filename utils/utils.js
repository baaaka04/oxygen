import fs from 'fs';

export function delTrs() {
    const file = fs.readFileSync("./dbase/bruh.csv", { encoding: 'utf-8' })
    const transactions = file
        .trim()
        .split('\n')
        .slice(0, -2)
        .join('\n')
        .concat('\n')
    fs.writeFileSync('./dbase/bruh.csv', transactions)
}

export function getLastNTransactions(n) {
    const file = fs.readFileSync("./dbasebruh.csv", { encoding: 'utf-8' })
    const transactions = file.trim().split('\n')
    const shortTrs = transactions.slice(transactions.length - n)

    return shortTrs
}