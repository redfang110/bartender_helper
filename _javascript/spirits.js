document.addEventListener('DOMContentLoaded', function () {
    const spiritsContainer = document.getElementById('spirits-container');

    // Fetch the JSON data for spirits
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(data => {
            // Access the spirits array from the data
            const spirits = data.spirits;

            // Iterate through each spirit and display it
            spirits.forEach(spirit => {
                const spiritContainer = document.createElement('div');
                spiritContainer.classList.add('spirit-container');

                const spiritDiv = document.createElement('div');
                spiritDiv.classList.add('spirit');

                const spiritName = document.createElement('h2');
                spiritName.textContent = spirit.name;

                // Create an image element and set its source
                const spiritImage = document.createElement('img');
                spiritImage.src = spirit.image;
                spiritImage.alt = spirit.name; // Set alt attribute for accessibility

                spiritDiv.appendChild(spiritName);
                spiritDiv.appendChild(spiritImage);

                spiritContainer.appendChild(spiritDiv);
                spiritsContainer.appendChild(spiritContainer);
            });
        })
        .catch(error => console.error('Error fetching spirits data:', error));
});
