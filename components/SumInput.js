import { useRef, useState } from "react";
import React from "react";
import CalcSVG from '../public/icons/calculator.svg';

const SumInput = ({ inputValue, setInputValue }) => {
    const [visible, setVisible] = useState(false);
    const [action, setAction] = useState('');
    const [calcMemo, setCalcMemo] = useState('');

    const ref = useRef(null);

    function onPressC() {
        setCalcMemo("");
        setAction('');
        setInputValue("");
    }

    function onPressOperation(event) {
        let prevAction = action; // set last action as current for calculations
        let calculated = '';
        setAction(event.target.innerHTML); // record new action from btn
        switch (prevAction) {
            case "+":
                calculated = String(Number(calcMemo) + Number(inputValue))
                setCalcMemo(calculated)
                setInputValue(calculated)
                break;
            case "-":
                calculated = String(Number(calcMemo) - Number(inputValue))
                setCalcMemo(calculated)
                setInputValue(calculated)
                break;
            case "/":
                calculated = String(Number(calcMemo) / Number(inputValue))
                setCalcMemo(calculated)
                setInputValue(calculated)
                break;
            case "*":
                calculated = String(Number(calcMemo) * Number(inputValue))
                setCalcMemo(calculated)
                setInputValue(calculated)
                break;

            default:
                setCalcMemo(inputValue)
                ref.current.focus();
                break;
        }
    }

    return (
        <div className="flex flex-col items-center my-3">
            {visible ?
                <div className="flex justify-between w-full gap-1 mb-2">
                    <button type="button" className="h-10 dark:text-indigo-200 bg-blue-100 text-blue-800 dark:bg-blue-600/70 rounded grow" onClick={onPressOperation}>+</button>
                    <button type="button" className="h-10 dark:text-indigo-200 bg-blue-100 text-blue-800 dark:bg-blue-600/70 rounded grow" onClick={onPressOperation}>-</button>
                    <button type="button" className="h-10 dark:text-indigo-200 bg-blue-100 text-blue-800 dark:bg-blue-600/70 rounded grow" onClick={onPressOperation}>/</button>
                    <button type="button" className="h-10 dark:text-indigo-200 bg-blue-100 text-blue-800 dark:bg-blue-600/70 rounded grow" onClick={onPressOperation}>*</button>
                    <button type="button" className="h-10 dark:text-indigo-200 bg-blue-100 text-blue-800 dark:bg-blue-600/70 rounded grow" onClick={onPressOperation}>=</button>
                    <button type="button" className="h-10 dark:text-indigo-200 bg-blue-400/70 text-blue-800 dark:bg-blue-900 rounded grow" onClick={onPressC}>C</button>
                </div>
                : null}

            <div className="flex items-center w-full rounded-md bg-blue-100 dark:bg-slate-700 ">
                <input
                    className="text-2xl text-center bg-blue-100 text-blue-800 placeholder:text-slate-300 dark:text-indigo-200 grow h-11 dark:bg-slate-700 dark:placeholder:text-slate-500"
                    placeholder="cумма"
                    name="sum"
                    type="number"
                    pattern="\d*"
                    id="calc-source"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    ref={ref}
                    onFocus={e => e.target.select()}
                />
                <CalcSVG className="p-1 cursor-pointer h-9 w-9" onClick={() => setVisible(!visible)} />
            </div>

        </div>

    )
}

export default SumInput