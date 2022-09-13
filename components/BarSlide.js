import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { BarTable } from './BarTable';
import { SliderContext } from './Slider';




export function BarSlide() {

    const { chartsData } = useContext(SliderContext)
    const barChartData = chartsData.barChartData

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    const data = {
        labels: barChartData.labels,
        datasets: barChartData.dataset.map(set => {
            const category = Object.keys(set)[0]
            return {
                label: category,
                data: set[category].values,
                backgroundColor: set[category].color,
            }
        })
    };
//!!!!!!!!!! width needs fixing
// learn flex css property
    return (
        <div className="flex-[1_0_100%] w-[130px] h-full"> 
            <div className="w-full max-w-2xl">
                <Bar options={options} data={data} height={230} />
            </div>
            <BarTable />
        </div>
    )
}