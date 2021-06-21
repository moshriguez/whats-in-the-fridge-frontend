import React, {useEffect, useState} from "react"
import {BrowserRouter as Router, Route, useHistory} from "react-router-dom"
import Navbar from "./containers/Navbar"
import Home from "./containers/Home"
import Fridge from "./containers/Fridge"
import Login from "./auth/Login"
import Signup from "./auth/Signup"

function App() {
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        if (token) {
            fetch("http://localhost:3000/api/v1/login", {
                method: "GET",
                headers: {
                    "Content-Type": "appliction/json",
                    "Authorization": `Bearear ${token}`
                }
            }).then(r => r.json()).then(data => setUser(data.user))
        }
    }, [])

    const handleLogut = () => {
        history.push("/")
        localStorage.clear()
        setUser(null)
    }

    return (
        <Router>
            <Navbar/>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/fridge" render={() => <Fridge />}/>
            {user ? null :
            <>
                <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
                <Route exact path="/signup" render={() => <Signup setUser={setUser}/>}/>
            </>}
        </Router>
    )
}

export default App