document.addEventListener('DOMContentLoaded', function () {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            // Populate Tools dropdown
            populateDropdown('tool', data.tools.map(tool => tool.name));

            // Populate Spirits dropdown
            populateDropdown('spirit', data.spirits.map(spirit => spirit.name));

            // Populate Mixers dropdown
            populateDropdown('mixer', data.mixers.map(mixer => mixer.name));

            let recipeBtn = document.getElementById('recipe-btn');
            recipeBtn.addEventListener("click", findRecipe);
        })
        .catch(error => console.error('Error fetching data:', error))
        // .finally(() => {
        //     // Call the findRecipe function after populating the dropdowns
        //     findRecipe();
        // });
});

function populateDropdown(selectId, options) {
    const selectElement = document.getElementById(selectId);

    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        selectElement.appendChild(optionElement);
    });
}

async function findRecipe() {
    // Assuming that the function body remains the same
    const selectedSpirit = document.getElementById('spirit').value;
    const selectedMixer = document.getElementById('mixer').value;
    const selectedTool = document.getElementById('tool').value;
    console.log("selectedSpirit: " + selectedSpirit);
    console.log("selectedMixer: " + selectedMixer);
    console.log("selectedTool: " + selectedTool);

    const data = await fetchData();
    const recipes = data.recipes;

    let selectedSpiritCategory;
    for (let i = 0; i < data.spirits.length; i ++) {
        if (data.spirits[i].name == selectedSpirit) {
            selectedSpiritCategory = data.spirits[i].category;
        }
    }
    console.log("selectedSpiritCategory: " + selectedSpiritCategory);

    const matchingRecipe = recipes.find(recipe =>
        (recipe.spirits.includes(selectedSpirit) || recipe.spirits.includes(selectedSpiritCategory))
        &&
        recipe.mixers.includes(selectedMixer)
        &&
        recipe.tools.includes(selectedTool)
    );

    if (matchingRecipe) {
        // Display the matching recipe details
        console.log("Matching Recipe Found:", matchingRecipe);
        addRecipe(matchingRecipe);
    } else {
        // Display no matching recipe found
        console.log("No matching recipe found.");
        const recipesContainer = document.getElementById('index-recipes-container');
        recipesContainer.innerHTML = '';
        const noFound = document.createElement('p');
        noFound.textContent = "No Matching Recipe Found!"
        recipesContainer.appendChild(noFound);
    }
}

async function fetchData() {
    const response = await fetch('./data.json'); // Replace with the actual path
    const data = await response.json();
    return data;
}

function addRecipe(recipe) {
    const recipesContainer = document.getElementById('index-recipes-container');
    recipesContainer.innerHTML = '';
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
}
