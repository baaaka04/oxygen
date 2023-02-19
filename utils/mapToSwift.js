import { getLastNTransactions, parseTransactions } from "./utils"

export function getLastNTransactionsToSwift (n) {
    const trs = getLastNTransactions(n)
        .reverse()
    // деструктурируем объект, переданный аргументом в .map и оставляем только нужную дату
    const parsedTrs = parseTransactions(trs)
        .map(({
            category,
            subCategory,
            opex,
            fulldate,
            sum,
            date,
        }) => ({
            category,
            subCategory,
            type: opex,
            date: fulldate,
            sum: Number(sum),
        })
        )
        return parsedTrs
}