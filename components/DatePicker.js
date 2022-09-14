import { useState } from "react"
import ArrowSVG from '../public/icons/arrow.svg'

async function fetchPieData(month, year) {
    return fetch('/api/chartsData', {
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

export const months = [
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

const curMonthNumber = new Date().toJSON().slice(5, 7)
const curYearNumber = new Date().getFullYear().toString()
const btnClass = "py-3 text-center border border-indigo-200 rounded-lg cursor-pointer grow"
const activeBtnClass = " dark:bg-blue-500/30 bg-blue-400/50"
const currnetBtnClass = " dark:bg-slate-700/70 bg-blue-200/30"

export function DatePicker({ setChartsData }) {

    const [month, setMonth] = useState(curMonthNumber)
    const [year, setYear] = useState(curYearNumber)
    const [isSelectVisible, setVisible] = useState(false)


    function getBtnStyle(value) {
        return btnClass + (
            month === value || year === value
                ? activeBtnClass
                : curMonthNumber === value || curYearNumber === value
                    ? currnetBtnClass
                    : ""
        )
    }

    function onClickMonth(e) {
        e.stopPropagation()
        const eventMonth = e.target.dataset.month
        setMonth(eventMonth)
        fetchPieData(eventMonth, year)
            .then(data => setChartsData(data))
    }

    function onClickYear(e) {
        e.stopPropagation()
        const eventYear = e.target.dataset.year
        setYear(eventYear)
        fetchPieData(month, eventYear)
            .then(data => setChartsData(data))
    }

    function swipeMonth(e) {
        const btnValue = e.currentTarget.dataset.num
        let newMonth = (Number(month) + Number(btnValue)).toString().padStart(2, '0')
        let selectedYear = year
        switch (newMonth) {
            case '00':
                newMonth = '12'
                selectedYear--
                break;
            case '13':
                newMonth = '01'
                selectedYear++
                break;
        }
        setMonth(newMonth)
        setYear(String(selectedYear))
        fetchPieData(newMonth, String(selectedYear))
            .then(data => setChartsData(data))
    }

    return (
        <div className="flex flex-col items-center w-full mt-auto">
            <div className="flex items-center justify-center mb-20 text-blue-900 rounded-full top-1 dark:text-indigo-200 dark:bg-blue-500/30 bg-blue-400/50 icon">
                <ArrowSVG data-num="-1" className="w-16 h-4 cursor-pointer" fill="rgb(59 130 246 / 0.7)" onClick={swipeMonth} />
                <button className="px-5 py-2 relative after:bg-blue-500/70 before:bg-blue-500/70 after:content-[''] after:h-3/4 after:block after:absolute after:top-1 after:left-full after:w-[1px] dark:after:bg-blue-600/30 before:content-[''] before:h-3/4 before:block before:absolute before:top-1 before:right-full before:w-[1px] dark:before:bg-blue-600/30" onClick={() => setVisible(!isSelectVisible)}>{months[+month - 1].title}, {year}</button>
                <ArrowSVG data-num="1" className="w-16 h-4 rotate-180 cursor-pointer" fill="rgb(59 130 246 / 0.7)" onClick={swipeMonth} />

            </div>
            {isSelectVisible ?
                <div className="absolute flex flex-col justify-end w-full h-full bottom-20" onClick={() => setVisible(!isSelectVisible)}>
                    <div className="w-full p-4 bg-white border-y-2 border-sky-300 dark:bg-slate-800 ">
                        <div className="flex w-full gap-2 mb-2 flex-between">
                            <div className={getBtnStyle('2021')} data-year="2021" onClick={onClickYear}>2021</div>
                            <div className={getBtnStyle('2022')} data-year="2022" onClick={onClickYear}>2022</div>
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2">
                            {months.map(item => {
                                return (
                                    <div className={getBtnStyle(item.value)} data-month={item.value} key={`month${item.value}`} onClick={onClickMonth}>{item.title}</div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}