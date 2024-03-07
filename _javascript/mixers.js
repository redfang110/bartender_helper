document.addEventListener('DOMContentLoaded', function () {

// Read the file with movies :
fetch('./../_json/data.json')
        .then(response => response.json())
        .then(mixerData => loadMixers(mixerData)).catch(error => console.error('Error fetching data:', error));


function loadMixers(mixerData) {
    
    // Find the element “mixers-container” in HTML
    let mixerContainer = document.getElementById("mixers-container");
    let cards = [];

    // Read every mixer from the array
    for (var i = 0; i < mixerData.mixers.length; i++){
        let name = mixerData.mixers[i].name;
        let category = mixerData.mixers[i].category;
        // let url = mixerData.mixers[i].url;
        let card = "card" + (i + 1).toString();

        let AddCardMixer = document.createElement("div");
        AddCardMixer.classList.add("col");
        AddCardMixer.innerHTML = `
            <div id=${card} class="card shadow-sm" style="object-fit:contain;max-height:325px;max-width:325px;">
                <div class="card-body">
                    <p class="card-text"> <strong>${name}</strong> <br>${category}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    </div>
                </div>
            </div>`;

        mixerContainer.appendChild(AddCardMixer);
        let ccard = document.getElementById(card);
        cards.push(ccard);
    }
}
});

            // <input type="checkbox" id=${checkbox} class="form-check-input" checked>
            // <label for=${checkbox} class="form-check-label">Show Image ${i + 1}</label>
            // <div id=${card} class="card shadow-sm" style="object-fit:contain;max-height:325px;max-width:325px;">
            //     <img src=${url} class="card-img-top" alt="..." style="object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;"></img>
            //     <div class="card-body">
            //         <p class="card-text"> <strong>${title}</strong>, <br>${year}</p>
            //         <div class="d-flex justify-content-between align-items-center">
                    
            //         </div>
            //     </div>
            // </div>`;