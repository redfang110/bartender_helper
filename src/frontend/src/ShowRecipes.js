import React, { useState, useEffect } from 'react';
import axios from 'axios';

function returnRecipes({ userId }) {
    const [recipes, setRecipes] = useState([]);
    const [returnRecipes, setReturnRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [onlyFav, setOnlyFav] = useState(false);
    const [onlyOwnedSpirits, setOnlyOwnedSpirits] = useState(false);
    const [onlyOwnedMixers, setOnlyOwnedMixers] = useState(false);

    const [userFav, setUserFav] = useState([]);
    const [userOwnedSpirits, setUserOwnedSpirits] = useState([]);
    const [userOwnedMixers, setUserOwnedMixers] = useState([]);

    const [showNone, setShowNone] = useState([]);

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

    const isIn = (recipe) => {
        if (searchTerm == '' || recipe.name.includes(searchTerm.toLowerCase())) {
            return true;
        }
        recipe.ingredients.spirits.forEach(function(spirit) {
            if (spirit.includes(searchTerm)) {
                return true;
            }
        });
        recipe.ingredients.mixers.forEach(function(mixer) {
            if (mixer.includes(searchTerm)) {
                return true;
            }
        });
    }

    const updateFilteredRecipes = () => {
        if (!onlyFav && !onlyOwnedSpirits && !onlyOwnedMixers) {
            setFilteredRecipes([]);
            if (searchTerm == '') {
                setReturnRecipes(recipes);
            }
            return;
        }
        let newFilteredRecipes = [];
        let recipesToCheck = recipes;
        if (onlyFav) {
            recipesToCheck.forEach(function(recipe) {
                if (recipe.name && userFav.includes(recipe.name) && !newFilteredRecipes.includes(recipe)) {
                    if (searchTerm == '' || isIn(recipe)) {
                        newFilteredRecipes.push(recipe);
                    }
                }
            });
        }
        if (onlyOwnedSpirits) {
            recipesToCheck.forEach(function(recipe) {
                if (recipe.ingredients.spirits) {
                    recipe.ingredients.spirits.forEach(function(spirit) {
                        console.log("owned" + userOwnedSpirits.includes(spirit));
                        if (userOwnedSpirits.includes(spirit) && !newFilteredRecipes.includes(recipe)) {
                            if (searchTerm == '' || isIn(recipe)) {
                                newFilteredRecipes.push(recipe);
                            }
                        }
                    });
                }
            });
        }
        if (onlyOwnedMixers) {
            recipesToCheck.forEach(function(recipe) {
                if (recipe.ingredients.mixers) {
                    recipe.ingredients.mixers.forEach(function(mixer) {
                        if (userOwnedMixers.includes(mixer) && !newFilteredRecipes.includes(recipe)) {
                            if (searchTerm == '' || isIn(recipe)) {
                                newFilteredRecipes.push(recipe);
                            }
                        }
                    });
                }
            });
        }
        setFilteredRecipes(newFilteredRecipes);
        console.log("newFiltered: " + newFilteredRecipes.length);
        console.log(newFilteredRecipes);
        if (newFilteredRecipes.length < 1) {
            setShowNone(true);
            setReturnRecipes([]);
        } else {
            setShowNone(false);
            setReturnRecipes(newFilteredRecipes);
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
                const response = await axios.get('http://localhost:4000/api/recipes');
                setRecipes(response.data);

                const user = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUserFav(user.data.recipes);
                setUserOwnedSpirits(user.data.spirits);
                setUserOwnedMixers(user.data.mixers);
                setReturnRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        }

        fetchRecipes();
    }, [userId]);

    // useEffect(() => {
    //     console.log(showNone);
    //     if (returnRecipes.length == 0 && !showNone && searchTerm == '' && !onlyFav && !onlyOwnedMixers && !onlyOwnedSpirits) {
    //         setReturnRecipes(recipes);
    //     }
    // }, [onlyOwnedSpirits, onlyOwnedMixers, onlyFav, showNone, searchTerm]);

    const handleAddRemoveRecipe = async (recipe) => {
        const updateRecipe = {
            userId: userId,
            recipe: recipe
        }
        try {
            if (userFav.includes(recipe)) {
                console.log("rm");
                await axios.post(`http://localhost:4000/api/users/remove-recipe`, updateRecipe);
            } else {
                console.log("add");
                await axios.post(`http://localhost:4000/api/users/add-recipe`, updateRecipe);
            }
            
            const updatedUser = await axios.get(`http://localhost:4000/api/users/` + userId);
            setUserFav(updatedUser.data.recipes);
            setUserOwnedSpirits(updatedUser.data.spirits);
            setUserOwnedMixers(updatedUser.data.mixers);
        } catch (error) {
            console.error(`Failed to edit recipe:`, error);
            alert(error.message); // Show error message in UI for better debugging
        }
    };
    

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: '600px', borderRadius: 20, paddingLeft: 10, margin: 10 }}
                />
                <br />
                <button
                    onClick={() => setOnlyOwnedSpirits(!onlyOwnedSpirits)}
                    style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: onlyOwnedSpirits ? "gray" : "blue", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                >
                    Owned Spirits
                </button>
                <button
                    onClick={() => setOnlyOwnedMixers(!onlyOwnedMixers)}
                    style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: onlyOwnedMixers ? "gray" : "blue", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                >
                    Owned Mixers
                </button>
                <button
                    onClick={() => setOnlyFav(!onlyFav)}
                    style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: onlyFav ? "gray" : "blue", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                >
                    Favorites
                </button>
            </div>
            <h2 className="mb-4">Recipes</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {returnRecipes.length > 0 ? (
                    returnRecipes.map(recipe => (
                        <div key={recipe._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{ maxHeight: 400, maxWidth: 350, textAlign: "center" }}>
                                    <img src={recipe.imageUrl} className="card-img-top" alt={recipe.name} style={{ objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto" }}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                    <p className="card-text">{recipe.description}</p>
                                    <button
                                        onClick={() => handleAddRemoveRecipe(recipe.name)}
                                        style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !userFav.includes(recipe.name) ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                                    >
                                        Mark Favorite
                                    </button>
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

export default returnRecipes;
