import React from 'react'
import { Col, Container, ListGroup, Row } from "react-bootstrap"
// import ListGroup from "react-bootstrap/ListGroup"


const Fridge = ({ user }) => {
    return (
        <Container>
            <Row>
                {/* User side */}
                <Col className="user-card">
                    <h3><strong>User:</strong> {user.username}</h3>
                    <p><strong>Bio:</strong> {user.bio}</p>
                    <p><strong>Favorite Food:</strong> {user.favorite_food}</p>
                </Col>

                {/* The Fridge */}
                <Col className="the-fridge">
                    <h2>The Fridge</h2>
                    <ListGroup variant="flush">
                        {user.ingredients.map(ingredient => {
                            return <ListGroup.Item key={ingredient.id}action variant="info" >{ingredient.name}</ListGroup.Item>
                        })}
                    </ListGroup>
                </Col>
                
            </Row>
        </Container>
    )
}

export default Fridge