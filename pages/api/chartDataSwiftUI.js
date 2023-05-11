import { getChartDataset, getDataByPeriodSwiftUI } from '../../utils/utils';

export default function chartDataSwiftUI(req, res) {
    const { month, year } = req.body
    const chartDataM = getDataByPeriodSwiftUI(month, year)
    const chartDataY = getDataByPeriodSwiftUI(month, year, true)
    res.status(201).json({
        barChartData:{
            monthly: chartDataM,
            yearly: chartDataY,
        },
        barChartDatalist: {
            monthly: getChartDataset(chartDataM, month, year),
            yearly: getChartDataset(chartDataY, month, year, true),
        }
    })
}