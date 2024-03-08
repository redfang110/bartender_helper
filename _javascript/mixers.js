document.addEventListener('DOMContentLoaded', function () {

    // Read the file with mixers
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(mixerData => loadMixers(mixerData))
        .catch(error => console.error('Error fetching data:', error));

    function loadMixers(mixerData) {

        // Find the element “mixers-container” in HTML
        let mixerContainer = document.getElementById("mixers-container");

        // Read every mixer from the array
        for (let i = 0; i < mixerData.mixers.length; i++) {
            let name = mixerData.mixers[i].name;
            let category = mixerData.mixers[i].category;
            let image = mixerData.mixers[i].image; // Assuming you have an 'image' property
            let card = "card" + (i + 1).toString();

            let AddCardMixer = document.createElement("div");
            AddCardMixer.classList.add("col");
            AddCardMixer.innerHTML = `
                <div id=${card} class="card shadow-sm" style="object-fit: contain; max-height: 325px; max-width: 325px;">
                    <img src=${image} class="card-img-top" alt="${name}" style="object-fit: contain; max-height: 250px; max-width: 250px; height: auto; width: auto; display: block;">
                    <div class="card-body">
                        <p class="card-text"><strong>${name}</strong><br>${category}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        </div>
                    </div>
                </div>`;

            mixerContainer.appendChild(AddCardMixer);
        }
    }
});
