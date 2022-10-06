import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import isAuthorized from "../utils/auth";
import { getCategoriesList } from "../utils/getCategoriesList";
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
    const categories = getCategoriesList()
    return {
        props: { hotkeysNum, categories }, // will be passed to the page component as props
    }
}


const Settings = ({ hotkeysNum, categories }) => {
    const [userTheme, setUserTheme] = useState('...')
    const [hotkeyNum, setHotkeyNum] = useState(hotkeysNum)
    const [categoryValue, setCategoryValue] = useState(categories[0] || '')
    const [newCategory, setNewCategory] = useState('')
    const [categoryList, setCategoryList] = useState(categories)
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

    function addNewCategory() {
        const params = { categories: [...categories, newCategory] }
        fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(data => {
                setNewCategory('')
                setCategoryList(data.newSettings.user.categories)
            })

    }

    function deleteCategory(e) {
        e.preventDefault();

        fetch("/api/deleteCategory", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: categoryValue })
        })
            .then(res => res.json())
            .then(data => setCategoryList(data.newCategories));
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
                            return <option key={`opt${i + 6}`}>{i + 6}</option>
                        })}
                    </select>
                </div>

                <div className="flex flex-wrap justify-between w-full mb-4">
                    <p>Добавить категорию</p>
                    <div className="flex justify-between w-full gap-2 align-middle">
                        <input
                            className="w-4/6 max-w-[350px] text-2xl text-center text-blue-800 bg-blue-100 rounded-md dark:text-indigo-200 h-11 dark:bg-slate-700"
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            required
                        />
                        <button className="w-24 bg-blue-100 rounded dark:bg-slate-500" onClick={addNewCategory}>Добавить</button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between w-full mb-4">
                    <p>Удалить категорию</p>
                    <div className="flex justify-between w-full gap-2 align-middle">
                        <select
                            className="w-4/6 px-5 text-2xl text-blue-800 bg-blue-100 rounded-md max-w-[350px] dark:text-indigo-200 datepicker h-11 dark:bg-slate-700" //padding 1.25rem bcs align-text:center doesnt work on iOS
                            name="category"
                            value={categoryValue}
                            onChange={e => setCategoryValue(e.target.value)}
                        >
                            {categoryList.map(category => {
                                return (
                                    <option key={'cat-' + category}>{category}</option>
                                )
                            })}
                        </select>

                        <button className="w-24 bg-blue-100 rounded dark:bg-slate-500" onClick={deleteCategory}>Удалить</button>
                    </div>
                </div>


            </div>
        </MainContainer>
    );
};


export default Settings;