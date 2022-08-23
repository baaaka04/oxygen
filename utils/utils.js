import fs from 'fs';

const demo = process.env.Z
function getFile() {
    return (demo
        ? fs.readFileSync("./dbase/bruh2.csv", { encoding: 'utf-8' })
        : fs.readFileSync("./dbase/bruh.csv", { encoding: 'utf-8' })
    )
}

export function delTrs() {
    const file = getFile()
    const transactions = file
        .trim()
        .split('\n')
        .slice(0, -1)
        .join('\n')
        .concat('\n')
    demo
        ? fs.writeFileSync('./dbase/bruh2.csv', transactions)
        : fs.writeFileSync('./dbase/bruh.csv', transactions)
}

export function getLastNTransactions(n) {
    const file = getFile()
    const transactions = file.trim().split('\n')
    const shortTrs = transactions.slice(transactions.length - n)

    return shortTrs
}

export function getMonthlyExpenses(month = '01', year = '2022') {

    const file = getFile()
    const transactions = file
        .trim()
        .split('\n')
        .slice(1)
        .map(row => row.split(','))
        .map(row => {
            const year = row[3].substring(0, 4)
            const month = row[3].substring(5, 7)

            return {
                category: row[0],
                subCategory: row[1],
                opex: row[2],
                date: row[3],
                year,
                month,
                sum: row[4]
            }
        })
        .filter(trs => trs.opex === 'опер' && trs.month === month && trs.year === year)
        .reduce((acc, cur) => {
            if (!acc[cur['category']]) {
                acc[cur['category']] = [];
            }
            acc[cur['category']].push(cur);
            return acc;
        }, {});

    const palette = [
        '#184E77',
        '#1E6091',
        '#1A759F',
        '#168AAD',
        '#34A0A4',
        '#52B69A',
        '#76C893',
        '#99D98C',
        '#B5E48C',
        '#D9ED92',
        '#EDFF7A',
    ]
    const totalsByCategory = Object.entries(transactions)
        .map(([title, arr]) => {
            return {
                title,
                value: 0 - arr.reduce((prev, cur) => prev + +cur.sum, 0),
            };
        })
        .sort((a, b) => b.value - a.value)
        .map((cat, i) => {
            return {
                ...cat,
                color: palette[i],
            }
        })

    return totalsByCategory
}