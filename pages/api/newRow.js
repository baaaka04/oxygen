import fs from 'fs';

export default function newRow(req, res) {

    const body = req.body
    let sign = ''

    if (body.opex !== 'доход') {
        sign = '-'
    }

    // проверка нужна чтобы не было ошибки
    const subCategory = (body.subCategory || '').toLowerCase()

    const newLine = `${body.category},${subCategory},${body.opex},${body.date},${sign}${body.sum}\n`
    fs.appendFileSync('./bruh.csv', newLine, { encoding: 'utf-8' })

    res.status(200).json()
}