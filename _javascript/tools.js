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
});