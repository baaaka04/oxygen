import MainContainer from "../components/MainContainer";
import isAuthorized from "../utils/auth";
import { getMonthlyExpenses } from "../utils/utils";
import { PieChart as Pie } from 'react-minimal-pie-chart';
import { useState } from "react";
import { DatePicker } from "../components/DatePicker";
import { PieTable } from "../components/PieTable";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


export async function getServerSideProps({ req, res }) {
    // ----------- authorization
    if (!isAuthorized(req)) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {}
        }
    }
    // ----------- authorization

    const pieChartData = getMonthlyExpenses()

    return {
        props: { pieChartData },
    }
}


const PieChart = ({ pieChartData }) => {
    const [pieData, setPieData] = useState(pieChartData)
    const pieSizeX = 190
    const pieSizeY = 130
    const centerX = pieSizeX / 2
    const centerY = pieSizeY / 2

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
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

    const labels = ['2021', '2022'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Dataset 3',
                data: labels.map(() => Math.random() * 1000),
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ],
    };



    return (
        <MainContainer>
            <div className="w-full max-w-2xl">
                <Bar options={options} data={data} />

                {/* <Pie
                    data={pieData}
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
                /> */}
            </div>
            <div className="flex flex-col items-center w-11/12 text-xs">
                <DatePicker
                    setPieData={setPieData}
                />
                <PieTable pieData={pieData} />
            </div>
        </MainContainer>
    );
};


export default PieChart;