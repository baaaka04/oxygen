import { useState } from "react"

async function fetchPieData(month, year) {
    return fetch('/api/pieData', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            month,
            year,
        }),
    })
        .then(res => res.json())
}

const months = [
    { title: 'январь', value: '01' },
    { title: 'февраль', value: '02' },
    { title: 'март', value: '03' },
    { title: 'апрель', value: '04' },
    { title: 'май', value: '05' },
    { title: 'июнь', value: '06' },
    { title: 'июль', value: '07' },
    { title: 'август', value: '08' },
    { title: 'сентябрь', value: '09' },
    { title: 'октябрь', value: '10' },
    { title: 'ноябрь', value: '11' },
    { title: 'декабрь', value: '12' },
]

export function DatePicker({ setPieData }) {

    const [month, setMonth] = useState(new Date().toJSON().slice(5, 7))
    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [isSelectVisible, setVisible] = useState(false)

    const btnClass = "py-3 text-center border border-indigo-200 rounded-lg cursor-pointer grow"
    const activeBtnClass = btnClass + " bg-indigo-900"

    function onClickMonth(e) {
        e.stopPropagation()
        const eventMonth = e.target.dataset.month
        setMonth(eventMonth)
        fetchPieData(eventMonth, year)
            .then(data => setPieData(data))
    }

    function onClickYear(e) {
        e.stopPropagation()
        const eventYear = e.target.dataset.year
        setYear(eventYear)
        fetchPieData(month, eventYear)
            .then(data => setPieData(data))
    }

    return (
        <div className="flex flex-col items-center w-full">
            <button className="px-5 py-2 mb-3 bg-indigo-900 rounded-lg" onClick={() => setVisible(!isSelectVisible)}>{months[+month - 1].title}, {year}</button>
            {isSelectVisible ?
                <div className="absolute top-0 flex flex-col justify-center w-full h-full" onClick={() => setVisible(!isSelectVisible)}>
                    <div className="w-full p-4 border-y-2 border-sky-300 bg-slate-800 ">
                        <div className="flex w-full gap-2 mb-2 flex-between">
                            <div className={year == '2021' ? activeBtnClass : btnClass} data-year="2021" onClick={onClickYear}>2021</div>
                            <div className={year == '2022' ? activeBtnClass : btnClass} data-year="2022" onClick={onClickYear}>2022</div>
                        </div>
                        <div className="grid w-full grid-cols-4 gap-2">
                            {months.map(item => {
                                return (
                                    <div className={month == item.value ? activeBtnClass : btnClass} data-month={item.value} onClick={onClickMonth}>{item.title}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}