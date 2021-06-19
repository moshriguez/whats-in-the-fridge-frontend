import {NavLink} from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/fridge">My Fridge</NavLink>
        </div>
    )
}

export default Navbar