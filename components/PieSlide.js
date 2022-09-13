import { useContext } from "react"
import { PieTable } from "./PieTable";
import { SliderContext } from "./Slider";
import { PieChart as Pie } from 'react-minimal-pie-chart';

export function PieSlide() {

    const { chartsData } = useContext(SliderContext)

    const pieSizeX = 190
    const pieSizeY = 130
    const centerX = pieSizeX / 2
    const centerY = pieSizeY / 2

    return (
        <div className="flex-[1_0_100%] h-full flex flex-col items-center">
            <div className="w-11/12 max-w-lg mx-auto">
                <Pie
                    data={chartsData.pieChartData}
                    lineWidth={30}
                    startAngle={330}
                    paddingAngle={1}
                    animate
                    label={({ dataEntry }) => {
                        return (`${dataEntry.title} ${Math.round(dataEntry.percentage)}%`)
                    }}
                    labelPosition={110}
                    labelStyle={{
                        fontSize: '5px',
                        fill: 'rgb(96 165 250)',
                        fontWeight: 500,
                    }}
                    viewBoxSize={[pieSizeX, pieSizeY]}
                    center={[centerX, centerY]}
                />
            </div>
            <PieTable />
        </div>
    )
}