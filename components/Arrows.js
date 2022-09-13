import { useContext } from "react";
import { SliderContext } from "./Slider";

export function Arrows () {

    const { changeSlide } = useContext(SliderContext);

    return (
        <div className="absolute flex justify-between w-full">
            <div onClick={() => changeSlide(-1)}>{"<"}</div>
            <div onClick={() => changeSlide(1)}>{">"}</div>
        </div>
    )
}