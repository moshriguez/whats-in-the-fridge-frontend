import React, { useState } from 'react'

const loginUrl = "http://localhost:3000/api/v1/login"
const userUrl = "http://localhost:3000/api/v1/users"

const Login = () => {
    const [userForm, setUserForm] = useState({username: "", password: ""})

    const handleChange = e => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    const sendAuthInfo = (body, url) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch(url, config).then(r => r.json()).then(data => console.log(data))
    }

    const handleLogin= e => {
        e.preventDefault()
        sendAuthInfo(userForm, loginUrl)
    }

    return (
        <div>
            <form onSubmit={e => handleLogin(e)}>
                <input onChange={e => handleChange(e)} value={userForm.username} name="username" placeholder="Enter your username..." required/>
                <input onChange={e => handleChange(e)} value={userForm.password} name="password" placeholder="Enter your passowrd..."type="password" required/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default Login