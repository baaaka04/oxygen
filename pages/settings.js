import { useEffect } from "react";
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

    const themeSwitch = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark', 'bg-slate-800', 'text-indigo-200')
            localStorage.setItem('theme', 'light')
            return
        }
        document.documentElement.classList.add('dark', 'bg-slate-800', 'text-indigo-200')
        localStorage.setItem('theme', 'dark')
        return
    }

    return (
        <MainContainer>
            <div className="w-11/12 flex flex-col items-center pt-3 text-4xl text-blue-800 dark:text-indigo-200">
                <div className="flex justify-around w-full">
                    <p>Тема приложения </p>
                    <button className="w-24 rounded dark:bg-slate-500 bg-blue-100 " onClick={themeSwitch}>изменить</button>
                </div>
            </div>
        </MainContainer>
    );
};


export default Settings;