import { useState } from 'react';
import { motion } from 'framer-motion'
import {Form, Col, ListGroup, Modal, Button} from 'react-bootstrap';

const userIngredientsUrl = "http://localhost:3000/api/v1/user_ingredients/"
const token = localStorage.getItem("jwt")

const Ingredient = ({user, setUser, showSearch, setSearch, ingredients, removeIngredientFromFridge}) => {
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
            const updatedUser = {...user}
            updatedUser.user_ingredients = [...updatedUser.user_ingredients, data.user_ingredient]
            setUser(updatedUser)
        })
    }

    // Toggles between adding and deleting ingredient
    const userIngredients = user.user_ingredients.map(i => i.ingredient.id)

    const handleAddDelete = e => {
        const ingredient_id = parseInt(e.target.name)
        const findUserIngredient = user.user_ingredients.find(ui => ui.ingredient.id === ingredient_id)
        const userIngredientId = findUserIngredient ? findUserIngredient.id : null
        findUserIngredient ? removeIngredientFromFridge(userIngredientId) : handleAddIngredient(ingredient_id)
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
                <motion.div className="list-group list-group-flush" initial="start" animate="end">
                    {   searchResults.length ?
                        searchResults.map((ingredient, idx) => {
                            return (
                                <motion.li variants={childVar(idx)} className="list-group-item list-group-item-primary" key={ingredient.id}>
                                    <div className="ingredient-btn">
                                        {ingredient.name}
                                        <Button 
                                            className={userIngredients.includes(ingredient.id) ? "minus" : "plus"} 
                                            name={ingredient.id} 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            onClick={e => handleAddDelete(e)}
                                        >
                                            {userIngredients.includes(ingredient.id) ? "-" : "+"}
                                        </Button>
                                    </div>
                                </motion.li>
                            )
                        }) :
                        <motion.li className="ing-null" variants={childVar(1)}>No results found...</motion.li>
                    }
                </motion.div>
            </Col> : null}
            <Modal.Footer></Modal.Footer>
        </Modal>
    )
}

export default Ingredient

const childVar = index => {
    return {
        start: {
            opacity: 0,
            y: -25
        },
        end: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.05
            }
        }
    }
}