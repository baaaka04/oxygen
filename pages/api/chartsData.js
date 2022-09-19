import { getBarChartData, getMonthlyExpenses } from '../../utils/utils';

export default function pieData(req, res) {
    const {month, year} = req.body
    const pieChartData = getMonthlyExpenses(month, year)
    const barOverMonthChartData = getBarChartData(month, year)
    const barOverYearChartData = getBarChartData(month, year, true)
    res.status(201).json({
        pieChartData,
        barOverMonthChartData,
        barOverYearChartData,
    })
}