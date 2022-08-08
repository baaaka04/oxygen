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
                Authorization: `Basic ${localStorage.getItem("user")}`,
            },
            body: JSON.stringify(data),
        })
            .then(res => { if (res.statusText !== "OK") setTable(tableMemo) }) // get data back if smthn wrong
    }

    function onPressDelete(e) {
        e.preventDefault();

        fetch("/api/deleteRow", {
            method: "DELETE",
            headers: {
                Authorization: `Basic ${localStorage.getItem("user")}`,
            },
        })
            .then(res => res.json())
            .then(data => setTable(data));
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="flex justify-center">
                <select className="w-11/12 text-2xl text-center text-indigo-200 h-9 bg-slate-700" name="category" value={categoryValue} onChange={e => setCategoryValue(e.target.value)}>
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
                    className="w-11/12 text-2xl text-center text-indigo-200 h-9 bg-slate-700 placeholder:text-slate-500"
                    placeholder="наименование"
                    name="subCategory"
                    type="text"
                    value={subCategoryValue}
                    onChange={e => setSubCategoryValue(e.target.value)}
                />
            </div>

            <div
                className="w-11/12 m-auto mb-3"
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
                            className="flex items-center justify-center w-full m-1 text-2xl border-2 border-indigo-900 rounded-lg cursor-pointer text-slate-500 h-14 bg-slate-700 peer-checked:text-indigo-200 peer-checked:border-indigo-100 hover:bg-indigo-900"
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
                            className="flex items-center justify-center w-full m-1 text-2xl border-2 border-indigo-900 rounded-lg cursor-pointer text-slate-500 h-14 bg-slate-700 peer-checked:text-indigo-200 peer-checked:border-indigo-100 hover:bg-indigo-900"
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
                            className="flex items-center justify-center w-full m-1 text-2xl border-2 border-indigo-900 rounded-lg cursor-pointer text-slate-500 h-14 bg-slate-700 peer-checked:text-indigo-200 peer-checked:border-indigo-100 hover:bg-indigo-900"
                            htmlFor="louie"
                        >инвест</label>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center mb-3">
                <input
                    className="w-11/12 text-2xl text-center text-indigo-200 h-9 bg-slate-700"
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
            <div className="flex justify-around w-11/12 m-auto">
                <button
                    className="w-9/12 h-20 m-1 text-2xl text-indigo-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >сохранить</button>

                <button
                    className="w-1/4 h-20 m-1 text-2xl text-indigo-200 bg-indigo-900 rounded-lg hover:bg-indigo-700"
                    onClick={onPressDelete}>удалить</button>
            </div>

        </form >
    )
}