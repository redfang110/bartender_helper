document.addEventListener('DOMContentLoaded', function () {
    const recipesContainer = document.getElementById('recipes-container');

    // Fetch the JSON data
    fetch('./../data.json')
        .then(response => response.json())
        .then(data => {
            // Access the recipes array from the data
            const recipes = data.recipes;

            // Iterate through each recipe and display it
            recipes.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.classList.add('element');
                recipeDiv.style = "object-fit:contain;height:1000px;max-width:500px;";

                const recipeName = document.createElement('h2');
                recipeName.classList.add('recipe-name');
                recipeName.textContent = recipe.name;

                const recipeImg = document.createElement('img');
                recipeImg.classList.add('recipe-image');
                recipeImg.classList.add('image');
                recipeImg.src = recipe.image;
                recipeImg.alt = "cocktail " + recipe.id;
                recipeImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                const recipeIngredientsBold = document.createElement('b');
                recipeIngredientsBold.textContent = "Ingredients:";
                const recipeIngredients = document.createElement('p');
                recipeIngredients.appendChild(recipeIngredientsBold);

                const recipeDetailsList = document.createElement('ul');
                recipeDetailsList.classList.add('recipe-details');
                recipeDetailsList.classList.add('body');

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
                const tools = recipe.tools.join(', ');
                const toolsItem = document.createElement('li');
                const toolsBold = document.createElement('b');
                toolsBold.textContent = `Tools: `;
                toolsItem.textContent = `${tools}`;
                recipeDetailsList.appendChild(toolsBold);
                recipeDetailsList.appendChild(toolsItem);

                // Display garnish
                const garnish = recipe.garnish.join(', ');
                const garnishItem = document.createElement('li');
                const garnishBold = document.createElement('b');
                garnishBold.textContent = `Garnish: `
                garnishItem.textContent = `${garnish}`;
                recipeDetailsList.appendChild(garnishBold);
                recipeDetailsList.appendChild(garnishItem);

                // Display preferred glass
                const glass = recipe['prefered glass'].join(', ');
                const glassItem = document.createElement('li');
                const glassBold = document.createElement('b');
                glassBold.textContent = `Preferred Glass: `;
                glassItem.textContent = `${glass}`;
                recipeDetailsList.appendChild(glassBold);
                recipeDetailsList.appendChild(glassItem);

                // Display recipe steps
                const recipeStepsItem = document.createElement('li');
                recipeStepsItem.innerHTML = `<strong>Recipe Steps:</strong> <ul>${recipe.recipe.map(step => `<li>${step}</li>`).join('')}</ul>`;
                recipeDetailsList.appendChild(recipeStepsItem);

                recipeDiv.appendChild(recipeName);
                recipeDiv.appendChild(recipeImg);
                recipeDiv.appendChild(recipeIngredients);
                recipeDiv.appendChild(recipeDetailsList);

                recipesContainer.appendChild(recipeDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
