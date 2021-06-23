import { useState } from 'react';
import {Form, Col, ListGroup, Modal} from 'react-bootstrap';
import {FiMinusCircle, FiPlusCircle} from 'react-icons/fi'

const userIngredientsUrl = "http://localhost:3000/api/v1/user_ingredients/"
const token = localStorage.getItem("jwt")

const Ingredient = ({user, setUser, showSearch, setSearch, ingredients}) => {
    // State for search results
    const [input, setInput] = useState("")
    const [searchResults, setSearchResults] = useState(null)

    // Search for ingredients
    const handleSubmit = e => {
        e.preventDefault()
        const filteredIngredients = ingredients.filter(i => i.name.toLowerCase().includes(input.toLowerCase()))
        setSearchResults(filteredIngredients)
    }

    const closeWindow = () => {
        setSearch(!showSearch)
        setSearchResults(null)
        setInput("")
    }

    // Adds ingredient to user's fridge
    const handleAddIngredient = id => {
        const  body = {
            user_id: user.id, 
            ingredient_id: id
        }
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
        fetch(userIngredientsUrl, config)
        .then(r => r.json())
        .then(data => {
            setUser(data.user)
        })
    }

    // Removes ingredient from user's fridge
    const handleRemoveIngredient = id => {
        const userIngredientId = user.user_ingredients.find(ui => ui.ingredient.id === id).id
        const config = {
            method: "DELETE",
            headers: {"Authorization": `Bearear ${token}`}
        }
        fetch(userIngredientsUrl + userIngredientId, config)
        .then(r => r.json())
        .then(data => {
            setUser(data.user)
        })
    }

    // Toggles between adding and deleting ingredient
    const userIngredients = user.user_ingredients.map(i => i.ingredient.id)
    
    const handleAddDelete = e => {
        const ingredient_id = parseInt(e.target.closest("button").getAttribute("ingredient"))
        userIngredients.includes(ingredient_id) ? handleRemoveIngredient(ingredient_id) : handleAddIngredient(ingredient_id)
    }

    return (
        <Modal
            show={showSearch}
            onHide={() => setSearch(closeWindow)}
            backdrop="static"
            keyboard={false}
         >
            <Modal.Header closeButton>
                <Modal.Title>Search for ingredients</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Control
                        type="input"
                        placeholder="Search for an ingredient..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            {searchResults ?
            <Col className="ingredients">
                <ListGroup variant="flush">
                    {searchResults.map(ingredient => {
                        return (
                            <ListGroup.Item 
                                action 
                                key={ingredient.id} 
                                onClick={e => handleAddDelete(e)} 
                                ingredient={ingredient.id} 
                                variant="primary"
                            >
                                <div className="ingredient-btn">
                                    {ingredient.name}
                                    {userIngredients.includes(ingredient.id) ? 
                                    <FiMinusCircle style={{fill: "red", stroke: "black"}} size={30}/> : 
                                    <FiPlusCircle style={{fill: "green", stroke: "black"}} size={30}/>}
                                </div>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Col> : null}
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}

export default Ingredient