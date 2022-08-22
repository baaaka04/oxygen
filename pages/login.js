import Router from "next/router";
import { useState } from "react";
import ProfileSVG from "../public/icons/profile.svg"

const Login = () => {
    const [pswValue, setPswValue] = useState('')

    function hadleSubmit(e) {
        e.preventDefault()
        const password = { value: e.currentTarget.password.value }

        fetch('/api/login', {
            method: "POST",
            redirect: 'follow',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(password)
        })
            .then(() => Router.push('/'))
            .catch(err => {
                console.log(err)
            })
        setPswValue('')
    }

    return (
        <form className="flex justify-center p-36 text-blue-900" onSubmit={hadleSubmit}>
                <div className="w-28 h-28 bg-slate-700 rounded-full absolute flex items-center justify-center p-4"><ProfileSVG /></div>
            <div className="flex flex-col items-center bg-blue-300/50 p-10 rounded-xl mt-14">
                <span className="my-6 text-xl">Введите пароль</span>
                <input
                    className="pl-3 w-70 h-9 bg-slate-50"
                    type="password"
                    name="password"
                    value={pswValue}
                    onChange={(e) => setPswValue(e.target.value)}
                    />
            </div>
        </form>
    );
};


export default Login;