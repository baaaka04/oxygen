import { delTrs, getLastNTransactions, parseTransactions } from '../../utils/utils';

export default function deleteRow(req, res) {
    delTrs()
    const lastTransactions = getLastNTransactions(5)
    
    res.status(201).json(
        parseTransactions(lastTransactions)
    )
}