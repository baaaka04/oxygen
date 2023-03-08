import { getHotkeysNumber } from '../../utils/getHoykeys';
import { getLastNTransactions } from '../../utils/utils';

export default function gft(req, res) {
    res.status(200).json(getFrequentTransactions())
}

export function getFrequentTransactions() {

    const counts = {};
    let frequentTrs = [];
    const trs = getLastNTransactions(200)
        .map((item) => item.split(",").slice(0, 3).toString());
    for (const num of trs) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let sortedtrs = Object.entries(counts)
        .sort(([, a], [, b]) => b - a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    frequentTrs = Object.keys(sortedtrs)
        .slice(0, getHotkeysNumber())
        .map((i) => i.split(","));

    return frequentTrs
}