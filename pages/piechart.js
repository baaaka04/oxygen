import MainContainer from "../components/MainContainer";
import isAuthorized from "../utils/auth";
import { getMonthlyExpenses } from "../utils/utils";
import { PieChart as Pie } from 'react-minimal-pie-chart';
import { useState } from "react";
import { DatePicker } from "../components/DatePicker";
import { PieTable } from "../components/PieTable";

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

    return (
        <MainContainer>
            <div className="flex flex-col items-center w-11/12 text-xs">
                <Pie
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
                        fill: 'rgb(199 210 254)',
                        fontWeight: 600,
                    }}
                    viewBoxSize={[190, 130]}
                    center={[95, 70]}
                />
                <DatePicker
                    setPieData={setPieData}
                />
                <PieTable pieData={pieData} />
            </div>
        </MainContainer>
    );
};


export default PieChart;