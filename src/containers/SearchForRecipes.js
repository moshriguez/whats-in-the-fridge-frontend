import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { motion } from 'framer-motion'

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
            fetchRecipes(query.slice(1))
        } else {
            setSearchBarValue('')
            setSearchResults([])
        }
    }, [query]) 

    const handleSearch = event => {
        event.preventDefault();
        let ingredient = searchBarValue;
        fetchRecipes(ingredient)
    }
    
    const handleChange = event => {
        setSearchBarValue(event.target.value);
    }

    const fetchRecipes = searchParam => {
        fetch(`${URL}?i=${searchParam}`).then(resp => {
            return resp.json()
        }).then(json => {
            setSearchResults(json.meals)
        });
    }

    return (
        <div className="search-page">
            <div className="recipe-search">
                <form onSubmit={handleSearch} >
                    <div className="search-container">
                        <AiOutlineSearch size={25}/>
                        <input onChange={handleChange} value={searchBarValue} placeholder="Search for an ingredient..." required/>
                    </div>
                </form>
            </div>
                {   
                    (searchResults === null) ? <div className="msg"><p>No results found</p></div> :
                    (searchResults.length === 0)? <div className="msg"><p>Search for an ingredient to find new recipes</p></div> :
                    <motion.div className="card-container" initial="start" animate="end">
                        {
                            searchResults.map((result, idx) => {
                                return (
                                    <motion.div className="card" key={result.idMeal} variants={childVar(idx)}>
                                        <img className="card-img-top" src={result.strMealThumb} alt={result.strMeal} />
                                        <div className="card-body">
                                            <h5 className="card-title">{result.strMeal}</h5>
                                            <Link to={{pathname: `/recipe`, search: `${result.idMeal}`}}>View Recipe</Link>
                                        </div>
                                    </motion.div>
                                );
                            })
                        }
                    </motion.div>
                }
        </div>
    )
}

export default SearchForRecipes

const childVar = index => {
    return {
        start: {opacity: 0},
        end: {
            opacity: 1,
            transition: {
                delay: index * 0.1
            }
        }
    }
}