// index.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch the data from data.json (replace with the correct path if needed)
    fetch('./../_json/data.json') // Adjust the path based on your project structure
        .then(response => response.json())
        .then(data => {
            // Populate Tools dropdown
            populateDropdown('tools', data.tools.map(tool => tool.name));

            // Populate Spirits dropdown
            populateDropdown('spirits', data.spirits.map(spirit => spirit.name));

            // Populate Mixers dropdown
            populateDropdown('mixers', data.mixers.map(mixer => mixer.name));
        })
        .catch(error => console.error('Error fetching data:', error));
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
