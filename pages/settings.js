import { useEffect, useState } from "react";
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
    const [userTheme, setUserTheme] = useState('...')
    useEffect(() => {
        setUserTheme(document.documentElement.classList.contains('dark') ? 'темная' : 'светлая')
    }, [])
    const themeSwitch = () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark', 'bg-slate-800', 'text-indigo-200')
            localStorage.setItem('theme', 'light')
            setUserTheme('светлая')
            return
        }
        document.documentElement.classList.add('dark', 'bg-slate-800', 'text-indigo-200')
        localStorage.setItem('theme', 'dark')
        setUserTheme('темная')
        return
    }

    return (
        <MainContainer>
            <div className="flex flex-col items-center w-11/12 pt-8 text-4xl text-blue-800 dark:text-indigo-200">
                <div className="flex justify-around w-full">
                    <p>Тема приложения </p>
                    <button className="w-24 bg-blue-100 rounded dark:bg-slate-500 " onClick={themeSwitch}>{userTheme}</button>
                </div>
            </div>
        </MainContainer>
    );
};


export default Settings;