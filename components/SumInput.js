import { useRef, useState } from "react";
import React from "react";
import CalcSVG from '../public/icons/calculator.svg';

const calcButtons = ['+', '-', '/', '*', '=']

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
                <div className="flex justify-between w-full gap-1 mb-2 font-bold">
                    {calcButtons.map(btn => {
                        return (
                            <div key={`${btn}btn`} className="flex justify-center h-full grow" onClick={onPressOperation}><div className="flex items-center justify-center w-16 h-16 text-2xl bg-blue-100 rounded-full text-blue-800/80 dark:text-indigo-200/80 dark:bg-blue-600/70">{btn}</div></div>
                        )
                    })}
                    <div className="flex justify-center h-full grow" onClick={onPressC}><div className="flex items-center justify-center w-16 h-16 text-2xl rounded-full text-blue-800/80 dark:text-indigo-200/80 bg-blue-400/70 dark:bg-blue-500/80">C</div></div>
                </div>
                : null}

            <div className="flex items-center w-full bg-blue-100 rounded-md dark:bg-slate-700 ">
                <input
                    className="text-2xl text-center text-blue-800 bg-blue-100 placeholder:text-slate-300 dark:text-indigo-200 grow h-11 dark:bg-slate-700 dark:placeholder:text-slate-500"
                    placeholder="cумма"
                    name="sum"
                    type="number"
                    pattern="\d*"
                    id="calc-source"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    ref={ref}
                    onFocus={e => e.target.select()}
                    required
                />
                <CalcSVG className="p-1 cursor-pointer h-9 w-9" onClick={() => setVisible(!visible)} />
            </div>

        </div>

    )
}

export default SumInput