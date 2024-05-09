import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowRecipes() {
    const [recipes, setRecipes] = useState([]); // State to store the recipes data

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get('http://localhost:4000/api/recipes'); // Adjust this URL to your API
                setRecipes(response.data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        }

        fetchRecipes();
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">Recipes</h2>
            <div className="row">
                {recipes.length > 0 ? (
                    recipes.map(recipe => (
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
