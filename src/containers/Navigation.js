import {NavLink} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"


const Navigation = () => {
    return (
        <Navbar bg="info" variant="dark" expand="sm">
            <Navbar.Brand>What's in the Fridge?</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
            <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Link eventKey="home" ><NavLink to="/">Home</NavLink></Nav.Link>
                <Nav.Link eventKey="fridge" ><NavLink to="/fridge">My Fridge</NavLink></Nav.Link>
                <Nav.Link eventKey="login" href="/login"><NavLink to="/login">Login</NavLink></Nav.Link>
                <Nav.Link eventKey="search" ><NavLink to="/search">Search for Recipes</NavLink></Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation