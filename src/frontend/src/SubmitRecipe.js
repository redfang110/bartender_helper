import React, { useState } from 'react';
import axios from 'axios';

function SubmitRecipe({ userId }) {
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
        const formattedData = {
            name: recipeName,
            createdBy,
            ingredients: {
                spirits: spirits.split(',').map(spirit => spirit.trim()),
                mixers: mixers.split(',').map(mixer => mixer.trim()),
                tools: tools.split(',').map(tool => tool.trim()),
            },
            steps: steps.split('\n').map(step => step.trim()),
            serving,
            imageUrl
        };

        try {
            const response = await axios.post('http://localhost:4000/api/recipes', formattedData);

            const addRecipeToUser = {
                userId: userId,
                recipe: response.data.name
            }
            await axios.post('http://localhost:4000/api/users/add-user-recipe', addRecipeToUser);
            alert('Recipe submitted successfully!');
            // Reset fields
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
        <div className="container mt-5">
            <h2>Submit a New Recipe</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="form-group">
                    <label>Recipe Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        placeholder="Enter Recipe Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Created By</label>
                    <input
                        type="text"
                        className="form-control"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        placeholder="Creator's Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Spirits</label>
                    <textarea
                        className="form-control"
                        value={spirits}
                        onChange={(e) => setSpirits(e.target.value)}
                        placeholder="List spirits, separated by commas"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mixers</label>
                    <textarea
                        className="form-control"
                        value={mixers}
                        onChange={(e) => setMixers(e.target.value)}
                        placeholder="List mixers, separated by commas"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tools</label>
                    <textarea
                        className="form-control"
                        value={tools}
                        onChange={(e) => setTools(e.target.value)}
                        placeholder="List tools, separated by commas"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Steps</label>
                    <textarea
                        className="form-control"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="Describe steps, each on a new line"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Serving</label>
                    <input
                        type="text"
                        className="form-control"
                        value={serving}
                        onChange={(e) => setServing(e.target.value)}
                        placeholder="Serving details"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Recipe</button>
            </form>
        </div>
    );
}

export default SubmitRecipe;
