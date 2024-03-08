document.addEventListener('DOMContentLoaded', function () {
    const mixersContainer = document.getElementById('mixers-container');

    // Fetch the JSON data
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(data => {
            // Access the mixers array from the data
            const mixers = data.mixers;

            // Iterate through each mixer and display it
            mixers.forEach(mixer => {
                const mixerDiv = document.createElement('div');
                mixerDiv.classList.add('mixer', 'card', 'shadow-sm'); // Add card and shadow classes

                const mixerName = document.createElement('h2');
                mixerName.textContent = mixer.name;

                const mixerImg = document.createElement('img');
                mixerImg.src = mixer.image;
                mixerImg.alt = "Mixer " + mixer.id;
                mixerImg.classList.add('mixer-img'); // Add a class for styling

                // Display mixer text
                const mixerText = document.createElement('p');
                mixerText.innerHTML = `<strong>${mixer.name}</strong> <br>Category: ${mixer.category}`;

                mixerDiv.appendChild(mixerImg);
                mixerDiv.appendChild(mixerText);

                mixersContainer.appendChild(mixerDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
 