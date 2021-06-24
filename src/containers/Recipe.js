import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { IoMdCheckmark } from 'react-icons/io'
import { FiX } from 'react-icons/fi'
import YouTubeVideo from '../components/YouTubeVideo'

const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php`
const EMPTY_RECEPIE_OBJECT = {
    ingredients: [],
    strInstructions: "Loading recipe..."
}

const NULL_RECEPIE_OBJECT = {
    ingredients: [],
    strInstructions: "No recipe found"
}

const Recipe = props => {

    const [recipe, setRecipe] = useState(EMPTY_RECEPIE_OBJECT)
    const [showVideo, setShowVideo] = useState(false)

    const fetchRecipeObj = (id) => {
        fetch(`${URL}?i=${id}`).then(resp => resp.json()).then(json => {
            if(!json.meals) {
                setRecipe(NULL_RECEPIE_OBJECT)
            } else {
                let recipe = json.meals[0]
                recipe.ingredients = [];
                for (let i = 1; i <= 20; i++) {
                    let ingredientKey = `strIngredient${i}`;
                    let measureKey = `strMeasure${i}`
                    if (recipe[ingredientKey] !== null && recipe[ingredientKey] !== "") {
                        recipe.ingredients.push({name: recipe[ingredientKey], measure: recipe[measureKey]})
                    }

                    delete recipe[ingredientKey]
                    delete recipe[measureKey]
                }
                setRecipe(recipe)
            }
        })
    }

    const includesIngredient = (userIngredients, ingredientString) => {
        return userIngredients.some(ingredient => {
            return ingredient.ingredient.name.toLowerCase() === ingredientString.toLowerCase()
        })
    }

    const instructionsList = () => {
        let str = recipe.strInstructions.includes("\r" || "\n" || "\r\n") ? 
        recipe.strInstructions.replace(/\r?\n|\r/g, " ") : 
        recipe.strInstructions

        let arr = str.split(". ").filter(i => i && i !== "" && i.length > 1)
        let newArr = Array.from({length:arr.length/2}, (_,i)=>arr[2*i]+ ". " +arr[2*i+1])
        
        if (recipe.strInstructions === "No recipe found") {
            return
        }
        if (arr.length % 2 !== 0) {
            let lastItem = arr.pop()
            return [...newArr, lastItem]
        }
        return newArr
    }

    let queryId = useLocation().search.slice(1);

    useEffect(() => fetchRecipeObj(queryId), [queryId])

    return (
        <div className="recipe-page">
            {   recipe.ingredients.length < 1 ? <div className="msg2"><p>{recipe.strInstructions}</p></div> :
                <>
                    <div className="recipe-info">
                        <h1>{ recipe.strMeal }</h1>
                        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                        {recipe.strYoutube ? <Button onClick={setShowVideo}>Video Instructions</Button> : null}
                    </div>
                    <div className="recipe-details">
                        <div className="recipe-ingredients">
                                <h3>Ingredients:</h3>
                                <ul>
                                    { recipe.ingredients.map((ingredient, index) => {
                                        return ( 
                                            <li key={index}>
                                                {props.user ? includesIngredient(props.user.user_ingredients, ingredient.name)? <IoMdCheckmark color="green "/> : <FiX color="red" /> : null}
                                                <Link to={{pathname: `/search`, search: `${ingredient.name}`}}>{ingredient.name}</Link>: {ingredient.measure}
                                            </li>
                                        )
                                    })}
                                </ul>
                        </div>
                        <div className="instruction-container">
                            <h3>Instructions:</h3>
                            <ul>
                                {instructionsList() ? instructionsList().map((instruction, idx) => <li key={idx}><input type="checkbox"/>{instruction}</li>) : null}
                            </ul>
                        </div>
                    </div>
                </>
            }
            <YouTubeVideo showVideo={showVideo} setShowVideo={setShowVideo} recipe={recipe}/>
        </div>
    );
}

export default Recipe;