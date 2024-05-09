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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Recipes</h2>
            <div className="row">
                {recipes.length > 0 ? (
                    recipes.map(recipe => (
                        <div className="col-md-6 mb-4" key={recipe._id}> {/* Increased width from col-md-4 to col-md-6 */}
                            <div className="card h-100">
                                <div style={{
                                    height: '300px', // Increased height for bigger images
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '20px'
                                }}>
                                    {recipe.imageUrl && (
                                        <img 
                                            src={recipe.imageUrl} 
                                            alt={recipe.name} 
                                            style={{
                                                width: '100%',  // Maintains full width
                                                height: '100%', // Ensures the height is fully used
                                                objectFit: 'contain', // Makes sure the entire image fits within the bounds without cropping
                                                objectPosition: 'center' // Center the image within the container
                                            }} 
                                        />
                                    )}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{recipe.name}</h5>
                                    <p className="card-text">{recipe.steps.join('\n')}</p>
                                    <footer className="blockquote-footer">Created by: {recipe.createdBy}</footer>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-warning" role="alert">
                        No recipes found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShowRecipes;
