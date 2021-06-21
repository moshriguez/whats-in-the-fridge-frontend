import React, {useState} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navigation from "./containers/Navigation"
import Home from "./containers/Home"
import Fridge from "./containers/Fridge"
import Login from "./auth/Login"
import SearchForRecipes from "./containers/SearchForRecipes"

function App() {
    const [user, setUser] = useState(null)

    return (
        <Router>
            <Navigation/>
            <Route exact path="/" render={() => <Home />}/>
            <Route exact path="/fridge" render={() => <Fridge />}/>
            <Route exact path="/search" render={() => <SearchForRecipes />}/>
            <Route exact path="/login" render={() => <Login setUser={setUser}/>}/>
        </Router>
    )
}

export default App