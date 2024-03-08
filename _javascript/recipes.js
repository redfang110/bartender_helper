document.addEventListener('DOMContentLoaded', function () {
    const recipesContainer = document.getElementById('recipes-container');

    // Fetch the JSON data
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(data => {
            // Access the recipes array from the data
            const recipes = data.recipes;

            // Iterate through each recipe and display it
            recipes.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');

                const recipeName = document.createElement('h2');
                recipeName.textContent = recipe.name;

                // Create an image element and set its source
                const recipeImage = document.createElement('img');
                recipeImage.src = recipe.image[0]; // Assuming each recipe has only one image
                recipeImage.alt = recipe.name; // Set alt attribute for accessibility

                const recipeDetailsList = document.createElement('ul');

                // Display spirits
                for (let i = 0; i < recipe.spirits.length; i++) {
                    const ingredient = document.createElement('li');
                    ingredient.textContent = `${recipe.spirits[i]}: ${recipe['spirit-volume'][i]} oz`;
                    recipeDetailsList.appendChild(ingredient);
                }

                // Display mixers
                for (let i = 0; i < recipe.mixers.length; i++) {
                    const ingredient = document.createElement('li');
                    ingredient.textContent = `${recipe.mixers[i]}: ${recipe['mixers-volume'][i]} oz`;
                    recipeDetailsList.appendChild(ingredient);
                }

                // Display tools
                const toolsItem = document.createElement('li');
                toolsItem.textContent = `Tools: ${recipe.tools.join(', ')}`;
                recipeDetailsList.appendChild(toolsItem);

                // ... (rest of the code remains the same)

                recipeDiv.appendChild(recipeName);
                recipeDiv.appendChild(recipeImage);
                recipeDiv.appendChild(recipeDetailsList);

                recipesContainer.appendChild(recipeDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
