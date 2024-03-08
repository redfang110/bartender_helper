document.addEventListener('DOMContentLoaded', function () {
    const toolsContainer = document.getElementById('tools-container');

    // Fetch the JSON data
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(data => {
            // Access the tools array from the data
            const tools = data.tools;

            // Iterate through each tool and display it
            tools.forEach(tool => {

                const toolDiv = document.createElement('div');
                toolDiv.classList.add('tool');
                toolDiv.classList.add('card');
                toolDiv.classList.add('shadow-sm');
                toolDiv.style = "object-fit:contain;max-width:325px;";

                const toolName = document.createElement('h2');
                toolName.textContent = tool.name;

                const toolImg = document.createElement('img');
                toolImg.src = tool.image;
                toolImg.alt = "Tool " + tool.id;
                toolImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                const toolBodyDiv = document.createElement('div');
                toolDiv.classList.add('tool-body');
                toolDiv.classList.add('card-body');

                // Display tool text
                const toolText = document.createElement('p');
                toolText.classList.add('tool-body');
                toolText.classList.add('card-body');
                toolText.innerHTML = `<strong>${tool.name}</strong> <br>${tool.description}`;
                toolBodyDiv.appendChild(toolText);

                toolDiv.appendChild(toolImg);
                toolDiv.appendChild(toolBodyDiv);

                toolsContainer.appendChild(toolDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
<<<<<<< HEAD

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
=======
});
>>>>>>> c29fccf2f2c112d3f05578a515b2108aa2fbc377
