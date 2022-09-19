import { useContext } from "react";
import { SliderContext } from "./Slider";

export function Dots() {

    const { goToSlide, slideNumber } = useContext(SliderContext);

    const slides = ['pieMonth', 'barMonth', 'barYear']

    return (
        <div className="flex mt-auto">
            {slides.map((slideName,i) => {
                return (
                    <div key={slideName} className={`w-3 h-3 m-3 cursor-pointer rounded-full ${slideNumber === i ? 'bg-blue-600/70' : 'bg-slate-200/70'}`} onClick={() => goToSlide(i)}></div>
                )
            })}
        </div>
    )
}