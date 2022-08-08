import { useRef, useState } from "react";
import React from "react";
import CalcSVG from '../public/images/calculator.svg';

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
                <div className="flex justify-between w-11/12 mb-2">
                    <button type="button" className="w-full h-10 m-1 text-indigo-200 bg-indigo-900 rounded hover:bg-indigo-700" onClick={onPressOperation}>+</button>
                    <button type="button" className="w-full h-10 m-1 text-indigo-200 bg-indigo-900 rounded hover:bg-indigo-700" onClick={onPressOperation}>-</button>
                    <button type="button" className="w-full h-10 m-1 text-indigo-200 bg-indigo-900 rounded hover:bg-indigo-700" onClick={onPressOperation}>/</button>
                    <button type="button" className="w-full h-10 m-1 text-indigo-200 bg-indigo-900 rounded hover:bg-indigo-700" onClick={onPressOperation}>*</button>
                    <button type="button" className="w-full h-10 m-1 text-indigo-200 bg-indigo-900 rounded hover:bg-indigo-700" onClick={onPressOperation}>=</button>
                    <button type="button" className="w-full h-10 m-1 text-indigo-200 bg-indigo-500 rounded hover:bg-indigo-700" onClick={onPressC}>C</button>
                </div>
                : null}

            <div className="flex items-center w-11/12 h-9 bg-slate-700">
                <input
                    className="w-full text-2xl text-center text-indigo-200 h-9 bg-slate-700 placeholder:text-slate-500"
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