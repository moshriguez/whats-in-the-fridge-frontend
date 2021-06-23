import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Button,
	Col,
	Container,
	Form,
	ListGroup,
	Modal,
	Row,
} from 'react-bootstrap';
// import ListGroup from "react-bootstrap/ListGroup"

const userUrl = "http://localhost:3000/api/v1/users/"
const userIngredientURL = "http://localhost:3000/api/v1/user_ingredients/"

const Fridge = ({ user, setUser }) => {
	// Pass reference to useHistory hook
	const history = useHistory()
	const token = localStorage.getItem('jwt')
    // To Show Modal
	const [show, setShow] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const showConfirm = () => setConfirm(!confirm)
    
    // Controlled form for edit user
    const [userBio, setUserBio] = useState(user ? user.bio : "")
    const [userFavFood, setUserFF] = useState(user ? user.favorite_food : "")

    const handleChangeBio = (e) => {
        setUserBio(e.target.value)
    }
    const handleChangeFF = (e) => {
        setUserFF(e.target.value)
    }

	// Delete an account
	const deleteAccount = () => {
		const config = {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		fetch(userUrl + user.id, config).then(() => {
			setConfirm(!confirm)
			history.replace("/")
			setUser(null)
			localStorage.clear()
		})
	};

	// Update account information
	const editAccount = () => {
		const config = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({bio: userBio, favorite_food: userFavFood})
		}

		fetch(userUrl + user.id, config).then(r => r.json()).then(data => {
			const user = data.user
			setUser(user)
			setShow(false)
			setUserBio(user.bio)
			setUserFF(user.favorite_food)
		})
	};

	// Removes Ingredient from Fridge
	const removeIngredientFromFridge = (e) => {
		const config = {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			}
		}
		fetch(userIngredientURL + e.target.name, config)
		.then(r => r.json())
		.then(() => {
			const updatedUser = {...user}
			updatedUser.user_ingredients = updatedUser.user_ingredients.filter(ui => ui.id !== parseInt(e.target.name))
			setUser(updatedUser)

		})
	}

	return (
		user ?
		<Container>
			<Row>
				{/* User side */}
				<Col className="user-card">
					<h3>
						<strong>User:</strong> {user.username}
					</h3>
					<p>
						<strong>Bio:</strong> {user.bio}
					</p>
					<p>
						<strong>Favorite Food:</strong> {user.favorite_food}
					</p>
					<Button variant="info" onClick={handleShow}>
						Edit Info
					</Button>
					<Button variant="danger" onClick={showConfirm}>
						Delete Account
					</Button>
				</Col>

				{/* The Fridge */}
				<Col className="the-fridge">
					<h2>The Fridge</h2>
					<ListGroup variant="flush">
						{user.user_ingredients.map((ui) => {
							return (
								<ListGroup.Item
									key={ui.id}
									action
									variant="info"
								>
									{ui.ingredient.name}
									<Button className="x-btn" name={ui.id} variant="outline-secondary" size="sm" onClick={removeIngredientFromFridge}>
										X
									</Button>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Col>

				{/* Edit Profile Modal */}
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Edit User Profile</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="favorite_food"
							>
								<Form.Label>Favorite Food</Form.Label>
								<Form.Control
									type="input"
									placeholder="What's your favorite food?"
                                    value={userFavFood}
                                    onChange={handleChangeFF}
								/>
							</Form.Group>

							<Form.Group
								className="mb-3"
								controlId="bio"
							>
								<Form.Label>Bio</Form.Label>
								<Form.Control
									as="textarea"
									placeholder="Tell us about yourself..."
                                    value={userBio}
                                    onChange={handleChangeBio}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="info" onClick={editAccount}>
							Update
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Delete Account Modal */}
				<Modal
					show={confirm}
					onHide={setConfirm}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Delete your account?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Button variant="info" onClick={() => setConfirm(!confirm)}>
							No
						</Button>						
						<Button variant="danger" onClick={deleteAccount}>
							Yes
						</Button>						
					</Modal.Body>
					<Modal.Footer>
					</Modal.Footer>
				</Modal>
			</Row>
		</Container> : null
	);
};

export default Fridge;
