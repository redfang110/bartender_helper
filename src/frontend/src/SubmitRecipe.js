import React, { useState } from 'react';
import axios from 'axios';

function SubmitRecipe() {
    const [recipeName, setRecipeName] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [spirits, setSpirits] = useState('');
    const [mixers, setMixers] = useState('');
    const [tools, setTools] = useState('');
    const [steps, setSteps] = useState('');
    const [serving, setServing] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Format the ingredients from string to array as expected by the backend
            const spiritsArray = spirits.split(',').map(spirit => spirit.trim());
            const mixersArray = mixers.split(',').map(mixer => mixer.trim());
            const toolsArray = tools.split(',').map(tool => tool.trim());
            const stepsArray = steps.split('\n').filter(step => step.trim() !== '');
            console.log("name: " + recipeName + "\ncreatedBy: " + createdBy + "\ningredients.spirits: " + spiritsArray
                + "\ningredients.mixers: " + mixersArray + "\ningredients.tools: " + toolsArray              
                + "\nsteps: " + stepsArray + "\nserving: " + serving + "\nimageUrl: " + imageUrl);

            const newRecipe = {
                name: recipeName,
                createdBy,
                ingredients: {
                    spirits: spiritsArray,
                    mixers: mixersArray,
                    tools: toolsArray,
                },
                steps: stepsArray,
                serving,
                imageUrl
            };

            // POST request to the backend using axios
            const response = await axios.post('http://localhost:4000/api/recipes', newRecipe);
            console.log('Recipe submitted successfully:', response.data);
            alert('Recipe submitted successfully!');

            // Clear the form fields after successful submission
            setRecipeName('');
            setCreatedBy('');
            setSpirits('');
            setMixers('');
            setTools('');
            setSteps('');
            setServing('');
            setImageUrl('');
        } catch (error) {
            console.error('Error submitting recipe:', error);
            alert('Failed to submit recipe. Please check the console for more details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit a New Recipe</h2>
            <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Recipe Name"
                required
            />
            <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                placeholder="Created By"
                required
            />
            <textarea
                value={spirits}
                onChange={(e) => setSpirits(e.target.value)}
                placeholder="Spirits (comma-separated)"
                required
            />
            <textarea
                value={mixers}
                onChange={(e) => setMixers(e.target.value)}
                placeholder="Mixers (comma-separated)"
                required
            />
            <textarea
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="Tools (comma-separated)"
                required
            />
            <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Steps (one per line)"
                required
            />
            <input
                type="text"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
                placeholder="Serving"
                required
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
                required
            />
            <button type="submit">Submit Recipe</button>
        </form>
    );
}

export default SubmitRecipe;
