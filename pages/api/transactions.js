import { getLastNTransactionsToSwift } from '../../utils/mapToSwift';

export default function transactions(req, res) {

    res.status(200).json( getLastNTransactionsToSwift(5) )
}