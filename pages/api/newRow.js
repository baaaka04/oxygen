import fs from 'fs';
import { getLastNTransactionsToSwift } from '../../utils/mapToSwift';

export default function newRow(req, res) {
    const demo = process.env.Z
    const body = req.body
    let sign = ''

    if (body.opex !== 'доход') {
        sign = '-'
    }

    // проверка нужна чтобы не было ошибки
    const subCategory = (body.subCategory || '(пусто)').toLowerCase()

    const newLine = `${body.category},${subCategory},${body.opex},${body.date},${sign}${body.sum}\n`
    demo
        ? fs.appendFileSync('./dbase/bruh2.csv', newLine, { encoding: 'utf-8' })
        : fs.appendFileSync('./dbase/bruh.csv', newLine, { encoding: 'utf-8' })

    res.status(200).json( getLastNTransactionsToSwift(20) )
}