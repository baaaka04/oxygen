import { getDataByPeriodSwiftUI } from '../../utils/utils';

export default function chartDataSwiftUI(req, res) {
    const {month, year} = req.body
    const chartData = getDataByPeriodSwiftUI(month, year)
    res.status(201).json({
        chartData,
    })
}