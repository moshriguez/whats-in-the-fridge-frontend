import React, { Component } from 'react'
import { withRouter } from 'react-router'

const userUrl = "http://localhost:3000/api/v1/users"
const allUsers = "http://localhost:3000/api/v1/usernames"

class Signup extends Component {
    state = {
        username: "",
        password: "",
        confirm: "",
        errors: []
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendAuthInfo = () => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                Accept : "application/json"
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password})
        }
        fetch(userUrl, config).then(r => r.json()).then(data => {
            this.props.setUser(data.user)
            localStorage.setItem("jwt", data.jwt)
            this.props.history.replace("/")
        })
    }

    handleSignup= e => {
        e.preventDefault()
        const s = this.state
        fetch(allUsers).then(r => r.json()).then(data => {
            const errors = []
            data.usernames.includes(s.username) ? errors.push("The username you have entered is already taken") : console.log()
            s.password !== s.confirm ? errors.push("The password you have entered does not match") : console.log()
            s.password.length < 6 || s.confirm.length < 6 ? errors.push("Your password must be at least 6 characters") : console.log()
            this.setState({errors: errors}, () => {
                !s.errors.length ? this.sendAuthInfo() : console.log()
            })
        })
        
    }

    render() {
        const s = this.state
        return (
            <div>
                <form onSubmit={e => this.handleSignup(e)}>
                    <input onChange={e => this.handleChange(e)} value={s.username} name="username" placeholder="Enter your username..." required/>
                    <input onChange={e => this.handleChange(e)} value={s.password} name="password" placeholder="Enter your passwprd..."type="password" required/>
                    <input onChange={e => this.handleChange(e)} value={s.confirm} name="confirm" placeholder="Renter your password..."type="password" required/>
                    <input type="submit"/>
                </form>
                <ul>
                    {s.errors.map(error => <li>{error}</li>)}
                </ul>
            </div>
        )
    }
}

export default withRouter(Signup)