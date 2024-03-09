document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from data.json (replace with the correct path if needed)
    fetch('./../data.json') // Adjust the path based on your project structure
        .then(response => response.json())
        .then(data => {
            // Populate Tools dropdown
            populateDropdown('tool', data.tools.map(tool => tool.name));

            // Populate Spirits dropdown
            populateDropdown('spirit', data.spirits.map(spirit => spirit.name));

            // Populate Mixers dropdown
            populateDropdown('mixer', data.mixers.map(mixer => mixer.name));
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
            // Call the findRecipe function after populating the dropdowns
            findRecipe();
        });
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

    const data = await fetchData();
    const recipes = data.recipes;

    const matchingRecipe = recipes.find(recipe =>
        recipe.spirits.includes(selectedSpirit) &&
        recipe.mixers.includes(selectedMixer) &&
        recipe.tools.includes(selectedTool)
    );

    if (matchingRecipe) {
        // Display the matching recipe details
        console.log("Matching Recipe Found:", matchingRecipe);
        // You can display the details in your HTML or perform other actions here
    } else {
        console.log("No matching recipe found.");
        // Display a message or perform other actions for no matching recipe
    }
}

async function fetchData() {
    const response = await fetch('./../data.json'); // Replace with the actual path
    const data = await response.json();
    return data;
}
