import { useContext } from "react";
import { SliderContext } from "./Slider";
import ArrowSVG from '../public/icons/arrow.svg'


export function Arrows() {

    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="absolute justify-between hidden w-full h-32 text-2xl top-1/2 md:flex">
            <div
                className="flex items-center justify-center w-10 cursor-pointer hover:bg-slate-200/50"
                onClick={() => changeSlide(-1)}
            >
                <ArrowSVG fill="#c7d2fe" />
            </div>
            <div
                className="flex items-center justify-center w-10 rotate-180 cursor-pointer hover:bg-slate-200/50"
                onClick={() => changeSlide(1)}
            >
                <ArrowSVG fill="#c7d2fe" />
            </div>
        </div>
    )
}