import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

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
        <div>
            <form onSubmit={e => handleSignup(e)}>
                <input onChange={e => handleChange(e)} value={userForm.username} name="username" placeholder="Enter your username..." required/>
                <input onChange={e => handleChange(e)} value={userForm.password} name="password" placeholder="Enter your password..."type="password" required/>
                <input onChange={e => handleChange(e)} value={userForm.confirm} name="confirm" placeholder="Renter your password..."type="password" required/>                    
                <input type="submit"/>
            </form>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        </div>
    )
}

export default Signup