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
                mixerDiv.classList.add('element');
                mixerDiv.style = "object-fit:contain;max-width:325px;";

                const mixerImg = document.createElement('img');
                mixerDiv.classList.add('mixer-image');
                mixerDiv.classList.add('image');
                mixerImg.src = mixer.image;
                mixerImg.alt = "mixer " + mixer.id;
                mixerImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                // Display mixer text
                const mixerText = document.createElement('p');
                mixerText.classList.add('mixer-body');
                mixerText.classList.add('body');
                mixerText.innerHTML = `<strong>${mixer.name}</strong> <br>Category: ${mixer.category}`;

                mixerDiv.appendChild(mixerImg);
                mixerDiv.appendChild(mixerText);
                mixersContainer.appendChild(mixerDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});