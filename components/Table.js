
export default function Table({ lastFiveTrs }) {
    return (
        <table className="w-full mb-4 border border-indigo-800">
            <thead className="bg-slate-700 h-9">
                <tr>
                    <th className="px-1 border border-indigo-800 w-13">Вид расхода</th>
                    <th className="px-1 border border-indigo-800">Наименование</th>
                    <th className="px-1 border border-indigo-800 w-9">Тип расхода</th>
                    <th className="px-1 border border-indigo-800">Дата</th>
                    <th className="px-1 border border-indigo-800">Сумма</th>
                </tr>
            </thead>

            <tbody>
                {lastFiveTrs.map(item => {
                    return (
                        <tr className="text-center" key={item.sum + item.subCategory + item.date}>
                            <td className="border border-indigo-800">{item.category}</td>
                            <td className="border border-indigo-800">{item.subCategory}</td>
                            <td className="border border-indigo-800">{item.opex}</td>
                            <td className="border border-indigo-800">{item.date}</td>
                            <td className="border border-indigo-800">{item.sum}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}