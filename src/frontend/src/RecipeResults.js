import React from 'react';

function RecipeResults({ recipes }) {
    return (
        <div>
            <h2>Recipe Results</h2>
            {recipes.map(recipe => (
                <div key={recipe._id}>
                    <h3>{recipe.name}</h3>
                    <p>Created by: {recipe.createdBy}</p>
                    <div>
                        <h4>Ingredients</h4>
                        <ul>
                            <li>Spirits: {recipe.ingredients.spirits.join(", ")}</li>
                            <li>Mixers: {recipe.ingredients.mixers.join(", ")}</li>
                            <li>Tools: {recipe.ingredients.tools.join(", ")}</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Steps</h4>
                        <ol>
                            {recipe.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                    <p><strong>Serving:</strong> {recipe.serving}</p>
                    {
                        <div>
                            <h4>Image</h4>
                            <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '100%' }} />
                        </div>
                    }
                </div>
            ))}
        </div>
    );
}

export default RecipeResults;
