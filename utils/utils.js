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

const piePalette = [
    '#184E77', '#1E6091', '#1A759F',
    '#168AAD', '#34A0A4', '#52B69A',
    '#76C893', '#99D98C', '#B5E48C',
    '#D9ED92', '#EDFF7A',
]

const barPalette = [
    "#184e77", "#5C6BC0", "#EC407A",
    "#FF7043", "#FFCA28", "#FFEE58",
    "#D4E157", "#66BB6A", "#26A69A",
    '#26C6DA', '#81D4FA',
]

export function getMonthlyExpenses(month = new Date().toJSON().slice(5, 7), year = new Date().getFullYear().toString()) {

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
                color: piePalette[i],
            }
        })

    return totalsByCategory
}

export function getBarChartData(monthNum = (new Date().getMonth() + 1), yearNum = new Date().getFullYear()) {
    let prevValueMonth = Number(monthNum) - 1
    let prevValueYear = Number(yearNum)
    if (prevValueMonth === 0) {
        prevValueYear--
        prevValueMonth = 12
    }
    const curMonth = yearNum + "-" + monthNum.toString().padStart(2, '0')
    const prevMonth = prevValueYear + "-" + prevValueMonth.toString().padStart(2, '0')

    const dataByPeriod = {
        prevMonth: getMonthlyExpenses(prevMonth.slice(-2), prevValueYear.toString()),
        curMonth: getMonthlyExpenses(curMonth.slice(-2), yearNum.toString()),
    }
    const allCats = [...dataByPeriod.curMonth, ...dataByPeriod.prevMonth].map(row => row.title)
    const uniqCats = [...new Set(allCats)]

    const barChartDataset = uniqCats.map((category, i) => {
        const obj = {
            [category]: {
                values: [
                    dataByPeriod.prevMonth.filter(dataObj => dataObj.title === category)[0]?.value || 0,
                    dataByPeriod.curMonth.filter(dataObj => dataObj.title === category)[0]?.value || 0,
                ],
                color: barPalette[i],
            }
        }
        return obj
    })
    return {
        labels: [prevMonth, curMonth],
        dataset: barChartDataset,
    }
}