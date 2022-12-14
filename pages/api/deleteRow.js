import { delTrs, getLastNTransactions } from '../../utils/utils';

export default function deleteRow(req, res) {
    delTrs()
    res.status(201).json(
        getLastNTransactions(5)
            .map(line => line.split(','))
            .map(arrayLine => {
                const category = arrayLine[0];
                const subCategory = arrayLine[1];
                const opex = arrayLine[2];
                const date = arrayLine[3].slice(5);
                const sum = arrayLine[4];

                const obj = {
                    category,
                    subCategory,
                    opex,
                    date,
                    sum,
                }
                return obj
            })
    )
}