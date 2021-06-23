import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {AiOutlineLock, AiOutlineUser} from 'react-icons/ai'

const loginUrl = "http://localhost:3000/api/v1/login"

const Login = ({setUser}) => {
    // Controlled form for user details
    const [userForm, setUserForm] = useState({username: "", password: ""})
    const handleChange = e => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    // Errors if incorrect username/password
    const [error, setError] = useState(null)

    // Pass reference to useHistory hook
    const history = useHistory()

    // Authenticate account
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
            if (data.error){
                setError(data.error)
            } else {
                setUser(data.user)
                localStorage.setItem("jwt", data.jwt)
                history.replace("/")
            }
        })
    }

    const handleLogin= e => {
        e.preventDefault()
        sendAuthInfo({...userForm, username: userForm.username.toLowerCase()}, loginUrl)
    }

    return (
        <div className="form-container">
            <div className="user-form">
                <form onSubmit={e => handleLogin(e)}>
                    <h1>Login</h1>
                    <label>Username</label>
                    <div className="info-container">
                        <AiOutlineUser size={23}/>
                        <input onChange={e => handleChange(e)} value={userForm.username} name="username" placeholder="Enter your username..." required/>
                    </div>
                    <label>Password</label>
                    <div className="info-container">
                        <AiOutlineLock size={23}/>
                        <input onChange={e => handleChange(e)} value={userForm.password} name="password" placeholder="Enter your password..."type="password" required/>
                    </div>
                    <button type="submit">Sign in</button>
                </form>
                {error ?
                <div className="error-container">
                    <h2>Error</h2>
                    <ul>
                        <li>{error}</li>
                    </ul>
                </div> : null}
                <div className="signup-container">
                    <p>Don't have an account?</p>
                    <a href="/signup">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login