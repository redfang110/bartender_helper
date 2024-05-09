import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowRecipes({ userId }) {
    const [recipes, setRecipes] = useState([]);
    const [showRecipes, setShowRecipes] = useState([]);
    const [userRecipes, setUserRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showOnlyOwned, setShowOnlyOwned] = useState(false);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get('http://localhost:4000/api/recipes');
                setRecipes(response.data);

                const user = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUserRecipes(user.data.recipes);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        }

        fetchRecipes();
    }, [userId]);

    useEffect(() => {
        const filtered = showOnlyOwned
            ? recipes.filter(recipe => userRecipes.includes(recipe._id))
            : recipes;
        setShowRecipes(filtered);
    }, [recipes, userRecipes, showOnlyOwned]);

    const handleAddRemoveRecipe = async (recipeId) => {
        const isOwned = userRecipes.includes(recipeId);
        const endpoint = isOwned ? 'remove-recipe' : 'add-recipe';
        try {
            const response = await axios.post(`http://localhost:4000/api/users/${endpoint}`, { userId, recipeId });
            console.log(response); // Debugging output to see the server response
            const updatedUser = await axios.get(`http://localhost:4000/api/users/${userId}`);
            setUserRecipes(updatedUser.data.recipes);
        } catch (error) {
            console.error(`Failed to ${isOwned ? 'remove' : 'add'} recipe:`, error);
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
                    onClick={() => setShowOnlyOwned(!showOnlyOwned)}
                    style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: showOnlyOwned ? "gray" : "blue", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                >
                    {showOnlyOwned ? 'Show All Recipes' : 'Show Only Owned Recipes'}
                </button>
            </div>
            <h2 className="mb-4">Recipes</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {showRecipes.length > 0 ? (
                    showRecipes.map(recipe => (
                        <div key={recipe._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{ maxHeight: 400, maxWidth: 350, textAlign: "center" }}>
                                    <img src={recipe.imageUrl} className="card-img-top" alt={recipe.name} style={{ objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto" }}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                    <p className="card-text">{recipe.description}</p>
                                    <button
                                        onClick={() => handleAddRemoveRecipe(recipe._id)}
                                        style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !userRecipes.includes(recipe._id) ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                                    >
                                        Mark Owned
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

export default ShowRecipes;
