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
                mixerDiv.classList.add('mixer');
                mixerDiv.classList.add('card');
                mixerDiv.classList.add('shadow-sm');
                mixerDiv.style = "object-fit:contain;max-width:325px;";

                const mixerName = document.createElement('h2');
                mixerName.textContent = mixer.name;

                const mixerImg = document.createElement('img');
                mixerImg.src = mixer.image;
                mixerImg.alt = "Mixer " + mixer.id;
                mixerImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                const mixerBodyDiv = document.createElement('div');
                mixerDiv.classList.add('mixer-body');
                mixerDiv.classList.add('card-body');

                // Display mixer text
                const mixerText = document.createElement('p');
                mixerText.classList.add('mixer-body');
                mixerText.classList.add('card-body');
                mixerText.innerHTML = `<strong>${mixer.name}</strong> <br>Category: ${mixer.category}`;
                mixerBodyDiv.appendChild(mixerText);

                mixerDiv.appendChild(mixerImg);
                mixerDiv.appendChild(mixerBodyDiv);

                mixersContainer.appendChild(mixerDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});