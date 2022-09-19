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
import { months } from './DatePicker';
import { SliderContext } from './Slider';




export function BarSlide({yearMode}) {

    const { chartsData } = useContext(SliderContext)
    const barChartData = yearMode ? chartsData.barOverYearChartData : chartsData.barOverMonthChartData

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
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#c7d2fe",
                    font: {
                        size: 14,
                    }
                    },
                stacked: true,
            },
            y: {
                display: false,
                stacked: true,
            },
        },
    };

    const data = {
        labels: barChartData.labels.map(label => {
            const m = months[+label.slice(-2)-1].title
            const y = label.slice(2,4)
            return m+"'"+y
        }),
        datasets: barChartData.dataset.map(set => {
            const category = Object.keys(set)[0]
            return {
                label: category,
                data: set[category].values,
                backgroundColor: set[category].color,
            }
        })
    };

    return (
        <div className="flex-[1_0_100%] h-full flex flex-col items-center">
            <div className="relative w-screen max-w-lg mt-3">
                <Bar options={options} data={data} />
            </div>
            <BarTable yearMode={yearMode}/>
        </div>
    )
}