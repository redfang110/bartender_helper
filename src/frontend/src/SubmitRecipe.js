// src/components/SubmitRecipe.js
import React, { useState } from 'react';
import axios from 'axios';

function SubmitRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/recipes', {
            name: recipeName,
            ingredients: ingredients.split(','),
            description
        });
        setRecipeName('');
        setIngredients('');
        setDescription('');
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <button type="submit">Submit Recipe</button>
        </form>
    );
}

export default SubmitRecipe;
