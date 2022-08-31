import { useState } from 'react';
import Form from '../components/Form';
import MainContainer from '../components/MainContainer';
import Table from "../components/Table";
import isAuthorized from '../utils/auth';
import { getHotkeysNumber } from '../utils/getHoykeys';
import { getLastNTransactions } from '../utils/utils';

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

    const lastFiveTrs = getLastNTransactions(5)
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
    return {
        props: { frequentTrs, lastFiveTrs }, // will be passed to the page component as props
    }
}

const Index = ({ frequentTrs, lastFiveTrs }) => {
    const [table, setTable] = useState(lastFiveTrs);

    return (
        <MainContainer>
            <Table lastFiveTrs={table} />
            <Form
                frequentTrs={frequentTrs}
                table={table}
                setTable={setTable}
            />
        </MainContainer>
    );
};


export default Index;