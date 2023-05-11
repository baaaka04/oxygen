import { getLastNTransactionsToSwift } from '../../utils/mapToSwift';

export default function transactions(req, res) {

    const query = req.query
    const { offset, limit } = query

    res.status(200).json( getLastNTransactionsToSwift(limit ?? 5) )
}