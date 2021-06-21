import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const loginUrl = "http://localhost:3000/api/v1/login"

const Login = ({setUser}) => {
    const [userForm, setUserForm] = useState({username: "", password: ""})
    const history = useHistory()

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
        fetch(url, config).then(r => r.json()).then(data => {
            setUser(data.user)
            localStorage.setItem("jwt", data.jwt)
            history.replace("/")
        })
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