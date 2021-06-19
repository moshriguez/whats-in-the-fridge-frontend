import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from "./containers/Navbar"
import Home from "./containers/Home"
import Fridge from "./containers/Fridge"
import Login from "./containers/Login"

function App() {
    return (
        <Router>
            <Navbar/>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/" render={() => <Fridge />}/>
            <Route exact path="/" render={() => <Login />}/>
        </Router>
    )
}

export default App