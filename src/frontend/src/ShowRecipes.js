import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowRecipes({ userId }) {
    const [recipes, setRecipes] = useState([]); // State to store the recipes data
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [returnRecipes, setReturnRecipes] = useState([]);
    const [showNone, setShowNone] = useState(false)
    const [showAll, setShowAll] = useState(false)

    const [userOwnedSpirits, setUserOwnedSpirits] = useState([]);
    const [userOwnedMixers, setUserOwnedMixers] = useState([]);
    const [userFav, setUserFav] = useState([]);

    const [onlyOwnedSpirits, setOnlyOwnedSpirits] = useState(false);
    const [onlyOwnedMixers, setOnlyOwnedMixers] = useState(false);
    const [onlyFav, setOnlyFav] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const updateSearch = () => {
        if (searchTerm != '') {
            let newFilteredRecipes = [];
            let recipesToCheck = filteredRecipes.length > 0 ? filteredRecipes : recipes;
            recipesToCheck.forEach(function(recipe) {
                if (recipe.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    newFilteredRecipes.push(recipe);
                }
                if (recipe.spirits) {
                    recipe.spirits.forEach(function(spirit) {
                        if (spirit.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            newFilteredRecipes.push(recipe);
                        }
                    });
                }
                if (recipe.mixers) {
                    recipe.mixers.forEach(function(mixer) {
                        if (mixer.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            newFilteredRecipes.push(recipe);
                        }
                    });
                }
            });
            setReturnRecipes(newFilteredRecipes);
            if (newFilteredRecipes.length < 1) {
                setShowNone(true);
                setReturnRecipes([]);
            } else {
                setShowNone(false);
            }
        } else {
            if (filteredRecipes.length < 1) {
                setReturnRecipes(recipes);
            } else {
                setReturnRecipes(filteredRecipes);
            }
        }
    }

    const updateFilteredRecipes = () => {
        if (!onlyFav && !onlyOwnedSpirits && !onlyOwnedMixers) {
            setFilteredRecipes([]);
            if (searchTerm == '') {
                setShowNone(false);
            } else {
                setFilteredRecipes([]);
            }
            return;
        }
        let newFilteredRecipes = [];
        let recipesToCheck = filteredRecipes.length > 0 ? filteredRecipes : recipes;
        if (onlyFav) {
            recipesToCheck.forEach(function(recipe) {
                if (recipe.name && userFav.includes(recipe.name) && !newFilteredRecipes.includes(recipe)) {
                    newFilteredRecipes.push(recipe);
                }
            });
        }
        if (onlyOwnedSpirits) {
            recipesToCheck.forEach(function(recipe) {
                if (recipe.spirit) {
                    recipe.spirits.forEach(function(spirit) {
                        if (userOwnedSpirits.includes(spirit.name) && !newFilteredRecipes.includes(recipe)) {
                            newFilteredRecipes.push(recipe);
                        }
                    });
                }
            });
        }
        if (onlyOwnedMixers) {
            recipesToCheck.forEach(function(recipe) {
                if (recipe.mixer) {
                    recipe.mixers.forEach(function(mixer) {
                        if (userOwnedMixers.includes(mixer.name) && !newFilteredRecipes.includes(recipe)) {
                            newFilteredRecipes.push(recipe);
                        }
                    });
                }
            });
        }
        setFilteredRecipes(newFilteredRecipes);
        if (newFilteredRecipes.length < 1) {
            setShowNone(true);
            setReturnRecipes([]);
        } else {
            setShowNone(false);
        }
    }

    const handleOnlyOwnedSpirits = () => {
        setOnlyOwnedSpirits(!onlyOwnedSpirits);
    }

    const handleOnlyOwnedMixers = () => {
        setOnlyOwnedMixers(!onlyOwnedMixers);
    }

    const handleOnlyFav = () => {
        setOnlyFav(!onlyFav);
    }

    useEffect(() => {
        updateSearch();
    }, [searchTerm]);

    useEffect(() => {
        updateFilteredRecipes();
    }, [onlyOwnedSpirits, onlyOwnedMixers, onlyFav]);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get('http://localhost:4000/api/recipes'); // Adjust this URL to your API
                setRecipes(response.data);
            
                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserOwnedSpirits(user.data.spirits);
                setUserOwnedMixers(user.data.mixers);
                setUserFav(user.data.recipes);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        }
        fetchRecipes();
    }, []);

    useEffect(() => {
        if (returnRecipes.length < 1 && !onlyFav && !onlyOwnedSpirits && !onlyOwnedMixers && searchTerm == '' && !showNone) {
            setReturnRecipes(recipes);
        }
        if (showAll) {
            setReturnRecipes(recipes);
        }
    });

    return (
        <div className="container">
            <div style={{ textAlign: 'center' }}>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '600px', borderRadius: 20, paddingLeft: 10, margin: 10 }} /> <br />
                {/* <button onClick={handleSearch} style={{ fontWeight: "bold", backgroundColor: "blue", color: "white", paddingLeft: 15, paddingRight: 15, marginLeft: 10}}>Search</button> <br /> */}
                <button onClick={handleOnlyOwnedSpirits} style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !onlyOwnedSpirits ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}>Only Owned Spirits</button>
                <button onClick={handleOnlyOwnedMixers} style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !onlyOwnedMixers ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}>Only Owned Mixers</button>
                <button onClick={handleOnlyFav} style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !onlyFav ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}>Only Favorites</button>
                {/* <button onClick={handleShowAll} style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !showAll ? "blue" : "gray", color: "white", marginLeft: 25}}>Show All</button> */}
            </div>
            <h2 className="my-4">Recipes</h2>
            <div className="row">
                {returnRecipes.length > 0 ? (
                    returnRecipes.map(recipe => (
                        <div className="col-md-4 mb-4" key={recipe._id}>
                            <div className="card">
                                {recipe.imageUrl && (
                                    <img src={recipe.imageUrl} alt={recipe.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                    <p className="card-text">{recipe.steps.join('\n')}</p>
                                    <footer className="blockquote-footer">Created by: {recipe.createdBy}</footer>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No recipes found.</p>
                )}
            </div>
        </div>
    );
}

export default ShowRecipes;
