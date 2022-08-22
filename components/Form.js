import { useState } from "react";
import HotKeys from "./HotKeys";
import SumInput from "./SumInput";

export default function Form({ table, setTable, frequentTrs }) {

    const [categoryValue, setCategoryValue] = useState("питание")
    const [subCategoryValue, setSubCategoryValue] = useState("")
    const [invest, setInvest] = useState("опер")
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10))
    const [inputValue, setInputValue] = useState('');

    function onPressHotkey(hotkey) {
        setCategoryValue(hotkey[0]);
        setSubCategoryValue(hotkey[1]);
        setInvest(hotkey[2]);
    }

    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};
        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }
        // ------------ changing state before sending request to execute faster
        let tableMemo = [...table]
        let newFiveRows = [...table].slice(1)
        let newRow = { ...data }
        newRow.date = newRow.date.slice(5)
        if (newRow.opex !== "доход") newRow.sum = "-" + newRow.sum
        newRow.subCategory = newRow.subCategory.toLowerCase()
        newFiveRows.push(newRow)

        setTable(newFiveRows)
        setCategoryValue("питание")
        setSubCategoryValue("")
        setInvest("опер")
        setDate(new Date().toJSON().slice(0, 10))
        setInputValue("")

        fetch("/api/newRow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => { if (res.statusText !== "OK") setTable(tableMemo) }) // get data back if smthn wrong
    }

    function onPressDelete(e) {
        e.preventDefault();

        fetch("/api/deleteRow", {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => setTable(data));
    }


    return (
        <form
            className="flex justify-center mb-28"
            onSubmit={onSubmit}>
            <div className="w-11/12">
                <div>
                    <select
                        className="w-full pl-5 text-2xl text-blue-800 bg-blue-100 rounded-md dark:text-indigo-200 datepicker h-11 dark:bg-slate-700" //padding 1.25rem bcs align-text:center doesnt work on iOS
                        name="category"
                        value={categoryValue}
                        onChange={e => setCategoryValue(e.target.value)}
                    >
                        <option>питание</option>
                        <option>транспорт</option>
                        <option>здоровье</option>
                        <option>ЖКХ</option>
                        <option>одежда</option>
                        <option>развлечения</option>
                        <option>подарки</option>
                        <option>бытовуха</option>
                        <option>интернет и связь</option>
                        <option>прочее</option>
                        <option>животные</option>
                        <option>здоровье</option>
                        <option>доход</option>
                    </select>
                </div>

                <div className="flex justify-center my-3">
                    <input
                        className="w-full text-2xl text-center text-blue-800 bg-blue-100 rounded-md dark:text-indigo-200 h-11 dark:bg-slate-700 dark:placeholder:text-slate-500 placeholder:text-slate-300"
                        placeholder="наименование"
                        name="subCategory"
                        type="text"
                        value={subCategoryValue}
                        onChange={e => setSubCategoryValue(e.target.value)}
                    />
                </div>

                <div
                    className="mb-3"
                    onChange={event => setInvest(event.target.value)}>
                    <ul className="flex justify-between w-full gap-3">
                        <li className="flex w-full">
                            <input
                                className="z-auto hidden opacity-0 peer"
                                type="radio"
                                id="huey"
                                name="opex"
                                value="опер"
                                readOnly
                                checked={invest === "опер"}
                            />
                            <label
                                className="flex items-center justify-center w-full text-2xl bg-blue-100 rounded-lg cursor-pointer peer-checked:border text-slate-300 dark:text-slate-500 h-14 dark:bg-slate-700 dark:peer-checked:text-indigo-200 dark:peer-checked:border-indigo-100 peer-checked:border-blue-500 peer-checked:text-blue-800"
                                htmlFor="huey"
                            >опер</label>
                        </li>

                        <li className="flex w-full">
                            <input
                                className="z-auto hidden opacity-0 peer"
                                type="radio"
                                id="dewey"
                                name="opex"
                                value="доход"
                                readOnly
                                checked={invest === "доход"}
                            />
                            <label
                                className="flex items-center justify-center w-full text-2xl bg-blue-100 rounded-lg cursor-pointer peer-checked:border text-slate-300 dark:text-slate-500 h-14 dark:bg-slate-700 dark:peer-checked:text-indigo-200 dark:peer-checked:border-indigo-100 peer-checked:border-blue-500 peer-checked:text-blue-800"
                                htmlFor="dewey"
                            >доход</label>
                        </li>

                        <li className="flex w-full">
                            <input
                                className="z-auto hidden opacity-0 peer"
                                type="radio"
                                id="louie"
                                name="opex"
                                value="инвест"
                                readOnly
                                checked={invest === "инвест"}
                            />
                            <label
                                className="flex items-center justify-center w-full text-2xl bg-blue-100 rounded-lg cursor-pointer peer-checked:border text-slate-300 dark:text-slate-500 h-14 dark:bg-slate-700 dark:peer-checked:text-indigo-200 dark:peer-checked:border-indigo-100 peer-checked:border-blue-500 peer-checked:text-blue-800"
                                htmlFor="louie"
                            >инвест</label>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center mb-3">
                    <input
                        className="w-full text-2xl text-center text-blue-800 bg-blue-100 rounded-lg dark:text-indigo-200 h-11 dark:bg-slate-700 datepicker"
                        name="date"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>
                <HotKeys
                    freqTrs={frequentTrs}
                    onPressHotkey={onPressHotkey}
                />
                <SumInput
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
                <div className="flex justify-between gap-3">
                    <button
                        className="w-8/12 h-20 text-2xl text-blue-900 rounded-lg bg-blue-400/50 dark:text-indigo-200 dark:bg-blue-600"
                    >сохранить</button>

                    <button
                        className="h-20 text-2xl text-blue-900 rounded-lg bg-blue-700/60 dark:text-indigo-200 grow"
                        onClick={onPressDelete}>удалить</button>
                </div>
            </div>
        </form >
    )
}