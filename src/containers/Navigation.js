import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'


const Navigation = ({user, setUser}) => {
    const history = useHistory()

    const handleLogout = () => {
        history.push("/")
        localStorage.clear()
        setUser(null)
    }

    return (
        <Navbar bg="info" variant="dark" expand="sm">
            <Navbar.Brand>What's in the Fridge?</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
            <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link eventKey={2} as={Link} to={user ? '/fridge' : '/login'}>My Fridge</Nav.Link>
                <Nav.Link eventKey={3} as={Link} to="/search" >Search for Recipes</Nav.Link>
                {user ? 
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link> :
                <Nav.Link eventKey={4} as={Link} to="/login">Login</Nav.Link>
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation