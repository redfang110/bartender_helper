document.addEventListener('DOMContentLoaded', function () {
    const spiritsContainer = document.getElementById('spirits-container');

    // Fetch the JSON data
    fetch('./../_json/data.json')
        .then(response => response.json())
        .then(data => {
            // Access the spirits array from the data
            const spirits = data.spirits;

            // Iterate through each spirit and display it
            spirits.forEach(spirit => {

                const spiritDiv = document.createElement('div');
                spiritDiv.classList.add('spirit');
                spiritDiv.classList.add('element');
                spiritDiv.style = "object-fit:contain;max-width:325px;";

                const spiritImg = document.createElement('img');
                spiritImg.classList.add('spirit-image');
                spiritImg.classList.add('image');
                spiritImg.src = spirit.image;
                spiritImg.alt = "spirit " + spirit.id;
                spiritImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                // Display spirit text
                const spiritText = document.createElement('p');
                spiritText.classList.add('spirit-body');
                spiritText.classList.add('body');
                spiritText.innerHTML = `<strong>${spirit.name}</strong> <br>Category: ${spirit.category}`;

                spiritDiv.appendChild(spiritImg);
                spiritDiv.appendChild(spiritText);
                spiritsContainer.appendChild(spiritDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
