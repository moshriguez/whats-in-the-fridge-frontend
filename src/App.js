import React, {useState} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from "./containers/Navbar"
import Home from "./containers/Home"
import Fridge from "./containers/Fridge"
import Login from "./auth/Login"

function App() {
    const [user, setUser] = useState(null)

    return (
        <Router>
            <Navbar/>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/fridge" render={() => <Fridge />}/>
            <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
        </Router>
    )
}

export default App