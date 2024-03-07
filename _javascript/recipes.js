document.addEventListener('DOMContentLoaded', function () {
    const recipesContainer = document.getElementById('recipes-container');

    // Fetch the JSON data
    fetch('./data.json')
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
                // tools item
                // Display tools
const toolsItem = document.createElement('li');
toolsItem.textContent = `Tools: ${recipe.tools.join(', ')}`;
recipeDetailsList.appendChild(toolsItem);



                // Display garnish
                const garnish = recipe.garnish.join(', ');
                const garnishItem = document.createElement('li');
                garnishItem.textContent = `Garnish: ${garnish}`;
                recipeDetailsList.appendChild(garnishItem);

                // Display preferred glass
                const glass = recipe['prefered glass'].join(', ');
                const glassItem = document.createElement('li');
                glassItem.textContent = `Preferred Glass: ${glass}`;
                recipeDetailsList.appendChild(glassItem);

                // Display recipe steps
                const recipeStepsItem = document.createElement('li');
                recipeStepsItem.innerHTML = `Recipe Steps: <ul>${recipe.recipe.map(step => `<li>${step}</li>`).join('')}</ul>`;
                recipeDetailsList.appendChild(recipeStepsItem);

                recipeDiv.appendChild(recipeName);
                recipeDiv.appendChild(recipeDetailsList);

                recipesContainer.appendChild(recipeDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
