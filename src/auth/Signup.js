import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {AiOutlineLock, AiOutlineUser} from 'react-icons/ai'

const userUrl = "http://localhost:3000/api/v1/users"
const allUsers = "http://localhost:3000/api/v1/usernames"

const Signup = ({setUser}) => {
    const [userForm, setUserForm] = useState({username: "", password: "", confirm: ""})
    const [errors, setErrors] = useState([])
    const history = useHistory()


    const handleChange = e => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    const sendAuthInfo = () => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify({username: userForm.username, password: userForm.password})
        }
        fetch(userUrl, config).then(r => r.json()).then(data => {
            setUser(data.user)
            localStorage.setItem("jwt", data.jwt)
            history.replace("/")
        })
    }

    const handleSignup = e => {
        e.preventDefault()
        fetch(allUsers).then(r => r.json()).then(data => {
            const newErrors = []
            data.usernames.includes(userForm.username) ? newErrors.push("The username you have entered is already taken") : console.log()
            userForm.password !== userForm.confirm ? newErrors.push("The password you have entered does not match") : console.log()
            userForm.password.length < 6 || userForm.confirm.length < 6 ? newErrors.push("Your password must be at least 6 characters") : console.log()
            setErrors(newErrors)
            !newErrors.length ? sendAuthInfo() : console.log()
        })
    }

    return (
        <div className="form-container">
            <div className="user-form">
                <form onSubmit={e => handleSignup(e)}>
                    <h1>Sign Up</h1>
                    <label>Create a username</label>
                    <div className="info-container">
                        <AiOutlineUser size={23}/>
                        <input onChange={e => handleChange(e)} value={userForm.username} name="username" placeholder="Enter your username..." required/>
                    </div>
                    <label>Create a password</label>
                    <div className="info-container">
                        <AiOutlineLock size={23}/>
                        <input onChange={e => handleChange(e)} value={userForm.password} name="password" placeholder="Enter your password..." type="password" required/>
                    </div>
                    <label>Confirm your password</label>
                    <div className="info-container">
                        <AiOutlineLock size={23}/>
                        <input onChange={e => handleChange(e)} value={userForm.confirm} name="confirm" placeholder="Enter your password..." type="password" required/>
                    </div>
                    <button type="submit">Create account</button>
                </form>
                {errors.length ?
                <div className="error-container">
                    <h2>Errors</h2>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div> : null}
                <div className="signup-container">
                    <p>Already have an account?</p>
                    <a href="/login">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Signup