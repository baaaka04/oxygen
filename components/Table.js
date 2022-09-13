import { addSpaceToNumber } from "../utils/finNumbers"

export default function Table({ lastFiveTrs }) {
    return (
        <table className="w-full mb-4 text-blue-900 border dark:text-indigo-200 dark:border-blue-600/20">
            <thead className="bg-blue-100 dark:bg-slate-700 h-9">
                <tr>
                    <th className="px-1 border border-blue-500/30 dark:border-blue-600/20 w-13">Вид расхода</th>
                    <th className="px-1 border border-blue-500/30 dark:border-blue-600/20">Наименование</th>
                    <th className="px-1 border border-blue-500/30 dark:border-blue-600/20 w-9">Тип расхода</th>
                    <th className="px-1 border border-blue-500/30 dark:border-blue-600/20">Дата</th>
                    <th className="px-1 border border-blue-500/30 dark:border-blue-600/20">Сумма</th>
                </tr>
            </thead>

            <tbody>
                {lastFiveTrs.map(item => {
                    return (
                        <tr className="text-center" key={item.sum + item.subCategory + item.date}>
                            <td className="border border-blue-500/30 dark:border-blue-600/20">{item.category}</td>
                            <td className="border border-blue-500/30 dark:border-blue-600/20">{item.subCategory}</td>
                            <td className="border border-blue-500/30 dark:border-blue-600/20">{item.opex}</td>
                            <td className="border border-blue-500/30 dark:border-blue-600/20">{item.date}</td>
                            <td className="border border-blue-500/30 dark:border-blue-600/20">{addSpaceToNumber(item.sum)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}