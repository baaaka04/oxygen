import MainContainer from "../components/MainContainer";
import isAuthorized from "../utils/auth";

export async function getServerSideProps({ req, res }) {
    // ----------- authorization
    if (!isAuthorized(req)) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {}
        }
    }
    // ----------- authorization
    return {
        props: {}, // will be passed to the page component as props
    }
}


const Users = () => {

    return (
        <MainContainer>
            <h1>Users</h1>
            <h1>Users</h1>
            <h1>Users</h1>
            <h1>Users</h1>
            <h1>Users</h1>
        </MainContainer>
    );
};


export default Users;