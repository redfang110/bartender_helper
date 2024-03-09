document.addEventListener('DOMContentLoaded', function () {
    const toolsContainer = document.getElementById('tools-container');

    // Fetch the JSON data
    fetch('./../data.json')
        .then(response => response.json())
        .then(data => {
            // Access the tools array from the data
            const tools = data.tools;

            // Iterate through each tool and display it
            tools.forEach(tool => {

                const toolDiv = document.createElement('div');
                toolDiv.classList.add('tool');
                toolDiv.classList.add('element');
                toolDiv.style = "object-fit:contain;max-width:325px;";

                const toolImg = document.createElement('img');
                toolDiv.classList.add('tool-image');
                toolDiv.classList.add('image');
                toolImg.src = "./../images/" + tool.image;
                toolImg.alt = "tool " + tool.id;
                toolImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                // Display tool text
                const toolText = document.createElement('p');
                toolText.classList.add('tool-body');
                toolText.classList.add('body');
                toolText.innerHTML = `<strong>${tool.name}</strong> <br>Description: ${tool.description}`;

                toolDiv.appendChild(toolImg);
                toolDiv.appendChild(toolText);
                toolsContainer.appendChild(toolDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});