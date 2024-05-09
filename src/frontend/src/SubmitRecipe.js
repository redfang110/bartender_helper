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
        <form onSubmit={handleSubmit} 
          style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
        }}>
            <h2>Submit a New Recipe</h2> <br/>
            <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Recipe Name"
                required
            /> <br/>
            <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Created By"
                required
            /> <br/>
            <textarea
                value={spirits}
                onChange={(e) => setSpirits(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Spirits (comma-separated)"
                required
            /> <br/>
            <textarea
                value={mixers}
                onChange={(e) => setMixers(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Mixers (comma-separated)"
                required
            /> <br/> 
            <textarea
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Tools (comma-separated)"
                required
            /> <br/> 
            <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Steps (one per line)"
                required
            /> <br/> 
            <input
                type="text"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Serving"
                required
            /> <br/> 
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ width: "200px", borderRadius: 20, paddingLeft: 10 }}
                placeholder="Image URL"
                required
            /> <br/> 
            <button type="submit" style={{width: "200px",fontWeight: "bold", borderRadius: 20, backgroundColor: "blue", color: "white"}}>Submit Recipe</button>
        </form>
    );
}

export default SubmitRecipe;
