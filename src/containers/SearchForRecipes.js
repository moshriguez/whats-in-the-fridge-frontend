import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const URL = "https://www.themealdb.com/api/json/v1/1/filter.php";

const SearchForRecipes = (props) => {

    const [searchResults, setSearchResults] = useState([])
    const [searchBarValue, setSearchBarValue] = useState("")

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