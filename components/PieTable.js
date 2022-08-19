import { addSpaceToNumber } from "../utils/finNumbers"

export function PieTable({ pieData }) {

    const totalMonthlyExpenses = pieData.reduce((acc, cur) => acc + cur.value, 0)

    return (
        <table className="w-full mb-4 border border-indigo-800">
            <thead className="bg-slate-700 h-9 py-1">
                <tr>
                    <th className="px-1 border border-indigo-800">Категория</th>
                    <th className="px-1 border border-indigo-800">Сумма, руб.</th>
                    <th className="px-1 border border-indigo-800">Процент</th>
                </tr>
            </thead>

            <tbody>
                {pieData.map(row => {
                    return (
                        <tr className="text-center" key={row.title}>
                            <td className="py-1 border border-indigo-800">{row.title}</td>
                            <td className="py-1 border border-indigo-800">{addSpaceToNumber(row.value)}</td>
                            <td className="py-1 border border-indigo-800">{Math.round((row.value / totalMonthlyExpenses) * 100)}%</td>
                        </tr>
                    )
                })}
                <tr className="text-center bg-slate-700">
                    <td className="py-1 border border-indigo-800">ИТОГО</td>
                    <td className="py-1 border border-indigo-800">{addSpaceToNumber(totalMonthlyExpenses)}</td>
                    <td className="py-1 border border-indigo-800">{totalMonthlyExpenses ? '100%' : '-'} </td>
                </tr>
            </tbody>
        </table>
    )
}