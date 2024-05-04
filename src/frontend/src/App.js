// src/App.js
import React, { useState } from 'react';
import Ingredients from './Ingredients';
import RecipeResults from './RecipeResults';
import SubmitRecipe from './SubmitRecipe';

function App() {
    const [recipes, setRecipes] = useState([]);

    return (
        <div>
            <h1>Bartender Helper</h1>
            <Ingredients setRecipes={setRecipes} />
            <RecipeResults recipes={recipes} />
            <SubmitRecipe />
        </div>
    );
}

export default App;
