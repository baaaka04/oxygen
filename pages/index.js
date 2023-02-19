import { useState } from 'react';
import Form from '../components/Form';
import MainContainer from '../components/MainContainer';
import Table from "../components/Table";
import isAuthorized from '../utils/auth';
import { getCategoriesList } from '../utils/getCategoriesList';
import { getHotkeysNumber } from '../utils/getHoykeys';
import { getLastNTransactions, parseTransactions } from '../utils/utils';

export async function getServerSideProps({ req, res }) {
    // ----------- authorization
    if (!isAuthorized(req)) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: { frequentTrs: [], lastFiveTrs: [] }
        }
    }
    // ----------- authorization

    const latestNExpenses = getLastNTransactions(5)
    const lastFiveTrs = parseTransactions(latestNExpenses)

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

    const categories = getCategoriesList()

    return {
        props: { frequentTrs, lastFiveTrs, categories }, // will be passed to the page component as props
    }
}

const Index = ({ frequentTrs, lastFiveTrs, categories }) => {
    const [table, setTable] = useState(lastFiveTrs);

    return (
        <MainContainer>
            <Table lastFiveTrs={table} />
            <Form
                frequentTrs={frequentTrs}
                table={table}
                setTable={setTable}
                categories={categories}
            />
        </MainContainer>
    );
};


export default Index;