import { getMonthlyExpenses } from '../../utils/utils';

export default function pieData(req, res) {
    const month = req.body.month
    const year = req.body.year
    const pieDataObj = getMonthlyExpenses(month, year)
    res.status(201).json(
        pieDataObj
    )
}