import { createContext, useState } from "react"
import { Arrows } from "./Arrows"
import { Dots } from "./Dots"
import { SliderList } from "./SliderList"

export const SliderContext = createContext()

export function Slider({ chartsData, setChartsData }) {
    const [slide, setSlide] = useState(0)
    const [touchPosition, setTouchPosition] = useState(null)

    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = 2 - 1; // to first slide
        } else {
            slideNumber = (slide + direction) % 2; //two slides
        }

        setSlide(slideNumber);
    };
    const goToSlide = (number) => {
        setSlide(number % 2); // two slides
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;

        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e) => {
        if (touchPosition === null) {
            return;
        }
        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        }

        if (direction < -10) {
            changeSlide(-1);
        }

        setTouchPosition(null);
    }

    return (
        <div
            className="relative flex flex-col items-center w-full overflow-hidden grow"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <SliderContext.Provider
                value={{
                    chartsData,
                    setChartsData,
                    changeSlide,
                    goToSlide,
                    slideNumber: slide,
                    slidesCount: 2,

                }}
            >
                <SliderList />
                <Arrows />
                <Dots />
            </SliderContext.Provider>
        </div>

    )
}