import Router from "next/router";
import { useState } from "react";
import MainContainer from "../components/MainContainer";

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
        <form className="flex flex-col items-center p-40" onSubmit={hadleSubmit}>
            <h1 className="mb-4 text-xl">password</h1>
            <input
                className="pl-3 w-70 h-9 bg-slate-700"
                type="password"
                name="password"
                value={pswValue}
                onChange={(e) => setPswValue(e.target.value)}
            />
            <button className="px-5 mt-4 text-xl border rounded-lg">submit</button>
        </form>
    );
};


export default Login;