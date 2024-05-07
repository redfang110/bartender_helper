import React, { useState } from 'react';
import axios from 'axios';

function SubmitRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [serving, setServing] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/recipes', {
            name: recipeName,
            ingredients: ingredients.split(','),
            steps: steps.split('\n'),
            serving,
            imageUrl
        });
        setRecipeName('');
        setIngredients('');
        setSteps('');
        setServing('');
        setImageUrl('');
        alert('Recipe submitted successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit a New Recipe</h2>
            <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Recipe Name"
                required
            />
            <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingredients (comma-separated)"
                required
            />
            <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Steps (one per line)"
                required
            />
            <input
                type="text"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
                placeholder="Serving"
                required
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
            />
            <button type="submit">Submit Recipe</button>
        </form>
    );
}

export default SubmitRecipe;
