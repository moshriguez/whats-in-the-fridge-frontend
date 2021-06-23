import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php`
const EMPTY_RECEPIE_OBJECT = {
    ingredients: [],
    strInstructions: "Loading recepie..."
}

const Recepie = props => {

    const [recepie, setRecepie] = useState(EMPTY_RECEPIE_OBJECT)

    const fetchRecepieObj = (id) => {
        fetch(`${URL}?i=${id}`).then(resp => resp.json()).then(json => {
            let recepie = json.meals[0]
            recepie.ingredients = [];
            for (let i = 1; i <= 20; i++) {
                let ingredientKey = `strIngredient${i}`;
                let measureKey = `strMeasure${i}`
                if (recepie[ingredientKey] !== null && recepie[ingredientKey] !== "") {
                    recepie.ingredients.push({name: recepie[ingredientKey], measure: recepie[measureKey]})
                }

                delete recepie[ingredientKey]
                delete recepie[measureKey]
            }
            console.log(recepie)
            setRecepie(recepie)
        })
    }

    useEffect(() => fetchRecepieObj(props.recepieId), [props.recepieId])

    return (
        <div>
            <h1>{ recepie.strMeal }</h1>
            <h3>Ingredients:</h3>
            <ul>
                { recepie.ingredients.map(ingredient => {
                    return ( 
                        <li><Link to={`/search?${ingredient.name}`}>{ingredient.name}</Link>: {ingredient.measure}</li>
                    );
                })}
            </ul>
            <h3>Instructions:</h3>
            <p>{ recepie.strInstructions }</p>
        </div>
    );
}

export default Recepie;