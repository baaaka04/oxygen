import { addSpaceToNumber } from "../utils/finNumbers"

export function PieTable({ pieData }) {

    const totalMonthlyExpenses = pieData.reduce((acc, cur) => acc + cur.value, 0)

    return (
        <table className="w-full mb-4 text-blue-900 border dark:text-indigo-200 border-blue-500/70 dark:border-blue-800/40">
            <thead className="bg-blue-100 dark:bg-slate-700">
                <tr>
                    <th className="p-1 border border-blue-500/70 dark:border-blue-800/40">Категория</th>
                    <th className="p-1 border border-blue-500/70 dark:border-blue-800/40">Сумма, руб.</th>
                    <th className="p-1 border border-blue-500/70 dark:border-blue-800/40">Процент</th>
                </tr>
            </thead>

            <tbody>
                {pieData.map(row => {
                    return (
                        <tr key={row.title}>
                            <td className="w-3/5 px-3 py-1 text-left border border-blue-500/70 dark:border-blue-800/40">{row.title}</td>
                            <td className="px-3 py-1 text-right border border-blue-500/70 dark:border-blue-800/40">{addSpaceToNumber(row.value)}</td>
                            <td className="py-1 text-center border border-blue-500/70 dark:border-blue-800/40">{Math.round((row.value / totalMonthlyExpenses) * 100)}%</td>
                        </tr>
                    )
                })}
                <tr className="text-center bg-blue-100 dark:bg-slate-700">
                    <td className="px-3 py-1 text-left border border-blue-500/70 dark:border-blue-800/40">ИТОГО</td>
                    <td className="px-3 py-1 text-right border border-blue-500/70 dark:border-blue-800/40">{addSpaceToNumber(totalMonthlyExpenses)}</td>
                    <td className="py-1 border border-blue-500/70 dark:border-blue-800/40">{totalMonthlyExpenses ? '100%' : '-'} </td>
                </tr>
            </tbody>
        </table>
    )
}