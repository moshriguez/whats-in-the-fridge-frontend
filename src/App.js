import React, {useEffect, useState} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.css"
import Navigation from "./containers/Navigation"
import Home from "./containers/Home"
import Fridge from "./containers/Fridge"
import Login from "./auth/Login"
import SearchForRecipes from "./containers/SearchForRecipes"
import Signup from "./auth/Signup"

function App() {
    const [user, setUser] = useState(null)

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

    return (
        <Router>
            <Navigation user={user} setUser={setUser}/>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/fridge" render={() => <Fridge />}/>
            <Route exact path="/search" render={() => <SearchForRecipes />}/>
            {user ? null :
            <>
                <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
                <Route exact path="/signup" render={() => <Signup setUser={setUser}/>}/>
            </>}
        </Router>
    )
}

export default App