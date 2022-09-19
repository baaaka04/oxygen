import { useState } from "react";
import MainContainer from "../components/MainContainer";
import { DatePicker } from "../components/DatePicker";
import { Slider } from "../components/Slider";
import isAuthorized from "../utils/auth";
import { getBarChartData, getMonthlyExpenses } from "../utils/utils";


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
    const barOverMonthChartData = getBarChartData()
    const barOverYearChartData = getBarChartData(...Array(2), true) //pass only last arg
    const chartsDataProp = {
        pieChartData,
        barOverMonthChartData,
        barOverYearChartData,
    }

    return {
        props: { chartsDataProp },
    }
}


const Charts = ({ chartsDataProp }) => {
    const [chartsData, setChartsData] = useState(chartsDataProp)

    return (
        <MainContainer>
            <Slider
                chartsData={chartsData}
                setChartsData={setChartsData}
            />
            <DatePicker setChartsData={setChartsData} />
        </MainContainer>
    );
};


export default Charts;