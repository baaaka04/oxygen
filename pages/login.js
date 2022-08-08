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
                setPswValue('')
            })
    }

    return (
        <MainContainer>
            <form className="flex flex-col items-center p-40" onSubmit={hadleSubmit}>
                <h1 className="mb-4 text-xl">Password</h1>
                <input
                    className="h-9 bg-slate-700"
                    type="password"
                    name="password"
                    value={pswValue}
                    onChange={(e) => setPswValue(e.target.value)}
                />
            </form>
        </MainContainer>
    );
};


export default Login;