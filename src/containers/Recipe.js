import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'

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
                console.log(recipe)
                setRecipe(recipe)
            }
        })
    }

    const includesIngredient = (userIngredients, ingredientString) => {
        return userIngredients.some(ingredient => {
            return ingredient.ingredient.name.toLowerCase() === ingredientString.toLowerCase()
        })
    }

    let queryId = useLocation().search.slice(1);

    useEffect(() => fetchRecipeObj(queryId), [queryId])

    return (
        <div>
            <h1>{ recipe.strMeal }</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>Ingredients:</h3>
            <ul>
                { recipe.ingredients.map((ingredient, index) => {
                    console.log(props.user)
                    return ( 
                        <li key={index}>
                            <Link to={{pathname: `/search`, search: `${ingredient.name}`}}>{ingredient.name}</Link>: {ingredient.measure}
                            {props.user ? includesIngredient(props.user.user_ingredients, ingredient.name)? null : <FiAlertCircle color="red" /> : null}
                        </li>
                    );
                })}
            </ul>
            <h3>Instructions:</h3>
            <p>{ recipe.strInstructions }</p>
        </div>
    );
}

export default Recipe;