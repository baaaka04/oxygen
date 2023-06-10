import { getChartDataset, getDataByPeriodSwiftUI } from '../../utils/utils';

export default function category_expenses (req, res) {
    const query = req.query
    const { category, month, year } = query

    const chartData = getDataByPeriodSwiftUI(month, year, false, category)
    const resData = getChartDataset(chartData, month, year, false, category).sort( (a, b) => b.curSum - a.curSum)

    res.status(201).json( resData )
}