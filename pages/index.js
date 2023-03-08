import { useState } from 'react';
import Form from '../components/Form';
import MainContainer from '../components/MainContainer';
import Table from "../components/Table";
import isAuthorized from '../utils/auth';
import { getCategoriesList } from '../utils/getCategoriesList';
import { getLastNTransactions, parseTransactions } from '../utils/utils';
import { getFrequentTransactions } from './api/getFrequentTransactions';

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
    const frequentTrs = getFrequentTransactions()
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