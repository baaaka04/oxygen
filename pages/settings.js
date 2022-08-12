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


const Settings = () => {

    return (
        <MainContainer>
            <h1 className="mt-40">Settings</h1>
        </MainContainer>
    );
};


export default Settings;