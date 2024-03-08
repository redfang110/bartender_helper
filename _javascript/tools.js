document.addEventListener('DOMContentLoaded', function () {

    // Read the file with tools
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(toolData => loadTools(toolData))
        .catch(error => console.error('Error fetching data:', error));

    function loadTools(toolData) {

        // Find the element “tools-container” in HTML
        let toolsContainer = document.getElementById("tools-container");

        // Read every tool from the array
        for (let i = 0; i < toolData.tools.length; i++) {
            let name = toolData.tools[i].name;
            let description = toolData.tools[i].description; // Corrected property name
            let image = toolData.tools[i].image; // Assuming you have an 'image' property
            let card = "card" + (i + 1).toString();

            let AddCardTool = document.createElement("div");
            AddCardTool.classList.add("col");
            AddCardTool.innerHTML = `
                <div id=${card} class="card shadow-sm" style="object-fit: contain; max-height: 325px; max-width: 325px;">
                    <img src=${image} class="card-img-top" alt="${name}" style="object-fit: contain; max-height: 250px; max-width: 250px; height: auto; width: auto; display: block;">
                    <div class="card-body">
                        <p class="card-text"><strong>${name}</strong><br>${description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        </div>
                    </div>
                </div>`;

            toolsContainer.appendChild(AddCardTool);
        }
    }
});
