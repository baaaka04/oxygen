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

export function parseTransactions(transactions = []) {
    return transactions
        .map(line => line.split(','))
        .map(arrayLine => {
            const category = arrayLine[0];
            const subCategory = arrayLine[1];
            const opex = arrayLine[2];
            const date = arrayLine[3].slice(5);
            const sum = arrayLine[4];
            const fulldate = arrayLine[3];

            const obj = {
                category,
                subCategory,
                opex,
                date,
                sum,
                fulldate,
            }
            return obj
        })
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

export function getMonthlyExpenses(
    month = new Date().toJSON().slice(5, 7), 
    year = new Date().getFullYear().toString(),
    byCategory = ""
    ) {

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
        .filter(trs => trs.opex === 'опер' && trs.month === month && trs.year === year && !(trs.category === 'прочее' && trs.subCategory === 'мать'))
        // if argument subcategory exists do filter
        .filter(trs => byCategory === "" ? true : trs.category === byCategory)
        .reduce((acc, cur) => {
            if (!acc[cur[`${byCategory === "" ? 'category' : 'subCategory'}`]]) {
                acc[cur[`${byCategory === "" ? 'category' : 'subCategory'}`]] = [];
            }
            acc[cur[`${byCategory === "" ? 'category' : 'subCategory'}`]].push(cur);
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

function getPrevAndCurPeriods (month = (new Date().getMonth() + 1), year = new Date().getFullYear(), isOverYear = false) {
    let prevValueMonth = Number(month) - 1
    let prevValueYear = Number(year)
    if (prevValueMonth === 0) {
        prevValueYear--
        prevValueMonth = 12
    }
    const curPeriod = year + "-" + month.toString().padStart(2, '0')
    const prevMonth = prevValueYear + "-" + prevValueMonth.toString().padStart(2, '0')
    const prevYear = (Number(year) - 1) + "-" + month.toString().padStart(2, '0')

    const prevPeriod = isOverYear ? prevYear : prevMonth
    return {
        curPeriod,
        prevPeriod,
    }
}

export function getDataByPeriodSwiftUI(monthNum, yearNum, yearMode, byCategory) {
    let {curPeriod, prevPeriod} = getPrevAndCurPeriods(monthNum, yearNum, yearMode)

    const dataByPeriod = {
        previousPeriod: [...getMonthlyExpenses(prevPeriod.slice(-2), prevPeriod.slice(0, 4), byCategory).map(({
            title,
            value,
            color,
        }) => ({
            category: title,
            sum: value,
            date: prevPeriod
        }))],
        currentPeriod: [...getMonthlyExpenses(curPeriod.slice(-2), curPeriod.slice(0, 4), byCategory).map(({
            title,
            value,
            color,
        }) => ({
            category: title,
            sum: value,
            date: curPeriod
        }))],
    }
    
    let barChartData = [...dataByPeriod.previousPeriod, ...dataByPeriod.currentPeriod]

    return barChartData
}

export function getChartDataset (barChartData, monthNum, yearNum, yearMode, byCategory) {
    let {curPeriod, prevPeriod} = getPrevAndCurPeriods(monthNum, yearNum, yearMode)

    const dataByPeriod = {
        previousPeriod: [...getMonthlyExpenses(prevPeriod.slice(-2), prevPeriod.slice(0, 4), byCategory).map(({
            title,
            value,
            color,
        }) => ({
            category: title,
            sum: value,
            date: prevPeriod
        }))],
        currentPeriod: [...getMonthlyExpenses(curPeriod.slice(-2), curPeriod.slice(0, 4), byCategory).map(({
            title,
            value,
            color,
        }) => ({
            category: title,
            sum: value,
            date: curPeriod
        }))],
    }

    const allCats = [...barChartData].map(row => row.category)
    const uniqCats = [...new Set(allCats)]
    const barChartDatalist = uniqCats.map((cat, _) => {
        return ({
            category: cat,
            prevSum: byCategory ? 0: dataByPeriod.previousPeriod.find(item => item.category === cat)?.sum ?? 0,
            curSum: dataByPeriod.currentPeriod.find(item => item.category === cat)?.sum ?? 0,
        })
    }).sort((a,b) => (b.curSum - b.prevSum) - (a.curSum - a.prevSum))

    return barChartDatalist
}

export function getBarChartData(monthNum = (new Date().getMonth() + 1), yearNum = new Date().getFullYear(), yearMode = false) {
    let {curPeriod, prevPeriod} = getPrevAndCurPeriods(monthNum, yearNum, yearMode)

    const dataByPeriod = {
        prevPeriod: getMonthlyExpenses(prevPeriod.slice(-2), prevPeriod.slice(0, 4)),
        curPeriod: getMonthlyExpenses(curPeriod.slice(-2), curPeriod.slice(0, 4)),
    }
    const allCats = [...dataByPeriod.curPeriod, ...dataByPeriod.prevPeriod].map(row => row.title)
    const uniqCats = [...new Set(allCats)]

    const barChartDataset = uniqCats.map((category, i) => {
        const obj = {
            [category]: {
                values: [
                    dataByPeriod.prevPeriod.filter(dataObj => dataObj.title === category)[0]?.value || 0,
                    dataByPeriod.curPeriod.filter(dataObj => dataObj.title === category)[0]?.value || 0,
                ],
                color: barPalette[i],
            }
        }
        return obj
    })
    return {
        labels: [prevPeriod, curPeriod],
        dataset: barChartDataset,
    }
}

export function getSettings() {
    return fs.readFileSync('./utils/settings.json', 'utf-8')
}

export function setSettings(newSettings) {
    fs.writeFileSync('./utils/settings.json', JSON.stringify(newSettings))
}