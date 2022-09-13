import { useContext } from "react"
import { addSpaceToNumber } from "../utils/finNumbers"
import { SliderContext } from "./Slider"

export function BarTable() {
    const { chartsData } = useContext(SliderContext)
    const { barChartData } = chartsData
    const { dataset } = barChartData

    let prevMonthNumbers = []
    let curMonthNumbers = []
    dataset.map(cat => {
        prevMonthNumbers.push(cat[Object.keys(cat)[0]].values[0])
        curMonthNumbers.push(cat[Object.keys(cat)[0]].values[1])
    })
    const prevMonthTotal = prevMonthNumbers.reduce((acc, cur) => acc + cur, 0)
    const curMonthTotal = curMonthNumbers.reduce((acc, cur) => acc + cur, 0)
    const totalChange = Math.round((curMonthTotal / prevMonthTotal -1) *100) || 0

    return (
        <>
            <table className="w-11/12 mb-4 text-xs text-blue-900 border-hidden dark:text-indigo-200">
                <thead className="bg-blue-100 dark:bg-slate-700">
                    <tr>
                        <th className="p-1 border rounded-tl-xl border-blue-500/30 dark:border-blue-600/20">Категория</th>
                        <th className="p-1 border border-blue-500/30 dark:border-blue-600/20">{barChartData.labels[0]}</th>
                        <th className="p-1 border border-blue-500/30 dark:border-blue-600/20">{barChartData.labels[1]}</th>
                        <th className="p-1 border rounded-tr-xl border-blue-500/30 dark:border-blue-600/20">разн.</th>
                    </tr>
                </thead>

                <tbody className="dark:bg-slate-700/20 bg-blue-100/10">
                    {dataset.map(row => {
                        const category = Object.keys(row)[0]
                        const prevMonth = row[category].values[0]
                        const curMonth = row[category].values[1]
                        const change = Math.round((curMonth / prevMonth -1)*100) || 0

                        return (
                            <tr key={category}>
                                <td className="px-3 py-1 text-left border border-blue-500/30 dark:border-blue-600/20"> {category}</td>
                                <td className="px-3 py-1 text-right border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(prevMonth)}</td>
                                <td className="px-3 py-1 text-right border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(curMonth)}</td>
                                <td className="px-3 py-1 text-center border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(change) ? addSpaceToNumber(change)+'%':"n/a"}</td>
                            </tr>
                        )
                    })}
                    <tr className="text-center bg-blue-100 dark:bg-slate-700">
                        <td className="px-3 py-1 text-left border border-blue-500/30 dark:border-blue-600/20">ИТОГО</td>
                        <td className="px-3 py-1 text-right border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(prevMonthTotal)}</td>
                        <td className="px-3 py-1 text-right border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(curMonthTotal)}</td>
                        <td className="py-1 border border-blue-500/30 dark:border-blue-600/20">{totalChange ? addSpaceToNumber(totalChange)+'%' : '-'} </td>
                    </tr>
                </tbody>
            </table>

        </>
    )
}