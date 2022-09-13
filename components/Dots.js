import { useContext } from "react";
import { SliderContext } from "./Slider";

export function Dots() {

    const { goToSlide, slideNumber } = useContext(SliderContext);

    return (
        <div className="flex mt-auto">
            <div className={`w-3 h-3 m-3 cursor-pointer rounded-full ${slideNumber === 0 ? 'bg-blue-600/70' : 'bg-slate-200/70'}`} onClick={() => goToSlide(0)}></div>
            <div className={`w-3 h-3 m-3 cursor-pointer rounded-full ${slideNumber === 1 ? 'bg-blue-600/70' : 'bg-slate-200/70'}`} onClick={() => goToSlide(1)}></div>
        </div>
    )
}