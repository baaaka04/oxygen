import { useContext } from "react";
import { BarSlide } from "./BarSlide";
import { PieSlide } from "./PieSlide";
import { SliderContext } from "./Slider";

export function SliderList() {
    const { slideNumber } = useContext(SliderContext);

    return (
        <div
            className="flex w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            <PieSlide />
            <BarSlide />
            <BarSlide yearMode/>
        </div>
    )
}