// document.addEventListener('DOMContentLoaded', function () {
//     const spiritsContainer = document.getElementById('spirits-container');

//     // Fetch the JSON data for spirits
//     fetch('./../_json/data.json')
//         .then(response => response.json())
//         .then(data => {
//             // Access the spirits array from the data
//             const spirits = data.spirits;

//             // Iterate through each spirit and display it
//             spirits.forEach(spirit => {
//                 const spiritContainer = document.createElement('div');
//                 spiritContainer.classList.add('spirit-container');

//                 const spiritDiv = document.createElement('div');
//                 spiritDiv.classList.add('spirit');

//                 const spiritName = document.createElement('h2');
//                 spiritName.textContent = spirit.name;

//                 // Create an image element and set its source
//                 const spiritImage = document.createElement('img');
//                 spiritImage.src = spirit.image;
//                 spiritImage.alt = spirit.name; // Set alt attribute for accessibility

//                 spiritDiv.appendChild(spiritName);
//                 spiritDiv.appendChild(spiritImage);

//                 spiritContainer.appendChild(spiritDiv);
//                 spiritsContainer.appendChild(spiritContainer);
//             });
//         })
//         .catch(error => console.error('Error fetching spirits data:', error));
// });

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
                spiritDiv.classList.add('card');
                spiritDiv.classList.add('shadow-sm');
                spiritDiv.style = "object-fit:contain;max-width:325px;";

                const spiritName = document.createElement('h2');
                spiritName.textContent = spirit.name;

                const spiritImg = document.createElement('img');
                spiritImg.src = spirit.image;
                spiritImg.alt = "Spirit " + spirit.id;
                spiritImg.style = "object-fit:contain;max-height:250px;max-width:250px;height:auto;width:auto;";

                const spiritBodyDiv = document.createElement('div');
                spiritDiv.classList.add('spirit-body');
                spiritDiv.classList.add('card-body');

                // Display spirit text
                const spiritText = document.createElement('p');
                spiritText.classList.add('spirit-body');
                spiritText.classList.add('card-body');
                spiritText.innerHTML = `<strong>${spirit.name}</strong> <br>Category: ${spirit.category}`;
                spiritBodyDiv.appendChild(spiritText);

                spiritDiv.appendChild(spiritImg);
                spiritDiv.appendChild(spiritBodyDiv);

                spiritsContainer.appendChild(spiritDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});