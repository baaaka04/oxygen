import { getBarChartData, getMonthlyExpenses } from '../../utils/utils';

export default function pieData(req, res) {
    const month = req.body.month
    const year = req.body.year
    const pieChartData = getMonthlyExpenses(month, year)
    const barChartData = getBarChartData(month, year)
    res.status(201).json({
        pieChartData,
        barChartData,
    })
}