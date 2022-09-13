import { useContext } from "react"
import { addSpaceToNumber } from "../utils/finNumbers"
import { SliderContext } from "./Slider"

export function PieTable() {
    const { chartsData } = useContext(SliderContext)
    const pieChartData = chartsData.pieChartData
    const totalMonthlyExpenses = pieChartData.reduce((acc, cur) => acc + cur.value, 0)

    return (
        <table className="w-11/12 max-w-2xl my-2 text-xs text-blue-900 border-hidden dark:text-indigo-200">
            <thead className="bg-blue-100 dark:bg-slate-700">
                <tr>
                    <th className="p-1 border rounded-tl-xl border-blue-500/30 dark:border-blue-600/20">Категория</th>
                    <th className="p-1 border border-blue-500/30 dark:border-blue-600/20">Сумма, руб.</th>
                    <th className="p-1 border rounded-tr-xl border-blue-500/30 dark:border-blue-600/20">Процент</th>
                </tr>
            </thead>

            <tbody className="dark:bg-slate-700/20 bg-blue-100/10">
                {pieChartData.map(row => {
                    return (
                        <tr key={row.title}>
                            <td className="w-1/2 px-3 py-1 text-left border border-blue-500/30 dark:border-blue-600/20">{row.title}</td>
                            <td className="px-3 py-1 text-right border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(row.value)}</td>
                            <td className="py-1 text-center border border-blue-500/30 dark:border-blue-600/20">{Math.round((row.value / totalMonthlyExpenses) * 100)}%</td>
                        </tr>
                    )
                })}
                <tr className="text-center bg-blue-100 dark:bg-slate-700">
                    <td className="px-3 py-1 text-left border border-blue-500/30 dark:border-blue-600/20">ИТОГО</td>
                    <td className="px-3 py-1 text-right border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(totalMonthlyExpenses)}</td>
                    <td className="py-1 border border-blue-500/30 dark:border-blue-600/20">{totalMonthlyExpenses ? '100%' : '-'} </td>
                </tr>
            </tbody>
        </table>
    )
}