import { React, useReducer, useState } from 'react';
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

const Fridge = ({ user }) => {
    // To Show Modal
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    
    // Controlled form for edit user
    const [userBio, setUserBio] = useState(user.bio)
    const [userFavFood, setUserFF] = useState(user.favorite_food)

    const handleChangeBio = (e) => {
        setUserBio(e.target.value)
    }
    const handleChangeFF = (e) => {
        setUserFF(e.target.value)
    }


	const deleteAccount = () => {};

	const editAccount = () => {};

	return (
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
					<Button variant="danger" onClick={deleteAccount}>
						Delete Account
					</Button>
				</Col>

				{/* The Fridge */}
				<Col className="the-fridge">
					<h2>The Fridge</h2>
					<ListGroup variant="flush">
						{user.ingredients.map((ingredient) => {
							return (
								<ListGroup.Item
									key={ingredient.id}
									action
									variant="info"
								>
									{ingredient.name}
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
			</Row>
		</Container>
	);
};

export default Fridge;
