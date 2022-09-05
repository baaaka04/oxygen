import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import isAuthorized from "../utils/auth";
import { getHotkeysNumber } from "../utils/getHoykeys";

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
    const hotkeysNum = getHotkeysNumber()
    return {
        props: { hotkeysNum }, // will be passed to the page component as props
    }
}


const Settings = ({ hotkeysNum }) => {
    const [userTheme, setUserTheme] = useState('...')
    const [hotkeyNum, setHotkeyNum] = useState(hotkeysNum)
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

    function setHotkeys(num) {
        setHotkeyNum(num)
        const params = { hotkey: num }

        fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        })
    }

    return (
        <MainContainer>
            <div className="flex flex-col items-center w-11/12 pt-8 text-4xl text-blue-800 dark:text-indigo-200">

                <div className="flex justify-between w-full mb-4">
                    <p>Тема приложения</p>
                    <button className="w-24 bg-blue-100 rounded dark:bg-slate-500 " onClick={themeSwitch}>{userTheme}</button>
                </div>

                <div className="flex justify-between w-full mb-4">
                    <p>Количество горячих клавиш</p>
                    <button className="w-24 ml-auto bg-blue-100 rounded dark:bg-slate-500" onClick={() => setHotkeys(8)}>сброс</button>
                    <select className="w-24 ml-2 text-center bg-blue-100 rounded dark:bg-slate-500" value={hotkeyNum} onChange={(e) => setHotkeys(e.target.value)}>
                        {[...Array(7).keys()].map(i => {
                            return <option>{i + 6}</option>
                        })}
                    </select>
                </div>

            </div>
        </MainContainer>
    );
};


export default Settings;