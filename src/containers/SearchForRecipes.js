<<<<<<< HEAD
import React, { useState } from 'react'
=======
import { search } from 'language-tags'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
>>>>>>> main
import { AiOutlineSearch } from 'react-icons/ai'

const URL = "https://www.themealdb.com/api/json/v1/1/filter.php";

const SearchForRecipes = (props) => {

    const [searchResults, setSearchResults] = useState([])
    const [searchBarValue, setSearchBarValue] = useState("")

    // useLocation cannot be called from a callback function...
    let query = useLocation().search
    // handles fetching of recipies when user clicks on an item in their fridge
    useEffect(() => {
        if (query !== '') {
            // console.log(query.slice(1))
            setSearchBarValue(query.slice(1))
            fetchRecepies(query.slice(1))
        } else {
            setSearchBarValue('')
            setSearchResults([])
        }
    }, [query]) 

    const handleSearch = event => {
        event.preventDefault();
        let ingredient = searchBarValue;
        fetchRecepies(ingredient)
    }
    
    const handleChange = event => {
        setSearchBarValue(event.target.value);
    }

    const fetchRecepies = searchParam => {
        fetch(`${URL}?i=${searchParam}`).then(resp => {
            return resp.json()
        }).then(json => {
            setSearchResults(json.meals)
        });
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSearch} >
                    <div className="info-container">
                        <AiOutlineSearch />
                        <input onChange={handleChange} value={searchBarValue} placeholder="Search for an ingredient..." required/>
                    </div>
                </form>
            </div>
            <div className="form-container">
                {
                    (searchResults === null)? "No results found" :
                    (searchResults.length === 0)? "Search for an ingredient to find new recepies" :
                    <div className="card-container" >
                        {
                            searchResults.map(result => {
                                return (
                                    <div className="card" style={{width: 18 + 'rem'}} mealId={result.idMeal} >
                                        <img className="card-img-top" src={result.strMealThumb} alt={result.strMeal} />
                                        <div className="card-body">
                                            <h5 class="card-title">{result.strMeal}</h5>
                                            <a href="">TODO: Put a link here to full recepie</a>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchForRecipes