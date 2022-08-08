import fs from 'fs';
import { getLastNTransactions } from '../../utils/utils';

export default function deleteRow(req, res) {
    const file = fs.readFileSync("./dbase/bruh.csv", { encoding: 'utf-8' })
    const transactions = file
        .trim()
        .split('\n')
        .slice(0, -1)
        .join('\n')
        .concat('\n')
    fs.writeFileSync('./dbase/bruh.csv', transactions)

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