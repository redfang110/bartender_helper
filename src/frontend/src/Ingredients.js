import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeResults from './RecipeResults';  // Ensure this is imported correctly

function Ingredients({ setRecipes, recipes }) {
    const [spirits, setSpirits] = useState([]);
    const [mixers, setMixers] = useState([]);
    const [tools, setTools] = useState([]);
    const [selectedSpirits, setSelectedSpirits] = useState([]);
    const [selectedMixers, setSelectedMixers] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const spiritsResponse = await axios.get('http://localhost:4000/api/spirits');
                setSpirits(spiritsResponse.data);
                const mixersResponse = await axios.get('http://localhost:4000/api/mixers');
                setMixers(mixersResponse.data);
                const toolsResponse = await axios.get('http://localhost:4000/api/tools');
                setTools(toolsResponse.data);
            } catch (error) {
                console.error('Failed to fetch ingredients:', error);
            }
        };
        fetchData();
    }, []);

    const handleFindRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/recipes/');
            let filteredData = [];
            for (let i = 0; i < response.data.length; i++) {
                let j;
                for (j = 0; j < selectedSpirits.length; j++) {
                    let check = response.data[i].ingredients.spirits.includes(selectedSpirits[j]) && !filteredData.includes(response.data[i]);
                    // console.log("Recipe: " + response.data[i].name + " : " + response.data[i].ingredients.spirits + "\nSpirit: " + selectedSpirits[j] + "\nCheck: " + check);
                    if (check) {
                        // console.log("push " + response.data[i].name + " with " + selectedSpirits[j]);
                        filteredData.push(response.data[i]);
                        break;
                    }
                }
                for (j = 0; j < selectedMixers.length; j++) {
                    let check = response.data[i].ingredients.mixers.includes(selectedMixers[j]) && !filteredData.includes(response.data[i]);
                    // console.log("Recipe: " + response.data[i].name + " : " + response.data[i].ingredients.mixers + "\nMixer: " + selectedMixers[j] + "\nCheck: " + check);
                    if (check) {
                        // console.log("push " + response.data[i].name + " with " + selectedMixers[j]);
                        filteredData.push(response.data[i]);
                        break;
                    }
                }
            }
            setRecipes(filteredData);
            // console.log(filteredData);
        } catch (error) {
            console.error('Failed to find recipes:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Select Ingredients</h2>
            <div className="mb-3">
                <h3>Spirits</h3>
                {spirits.map(spirit => (
                    <div key={spirit._id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedSpirits.includes(spirit.name)}
                            onChange={() => setSelectedSpirits(prev =>
                                prev.includes(spirit.name)
                                    ? prev.filter(item => item !== spirit.name)
                                    : [...prev, spirit.name]
                            )}
                        />
                        <label className="form-check-label">{spirit.name}</label>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <h3>Mixers</h3>
                {mixers.map(mixer => (
                    <div key={mixer._id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedMixers.includes(mixer.name)}
                            onChange={() => setSelectedMixers(prev =>
                                prev.includes(mixer.name)
                                    ? prev.filter(item => item !== mixer.name)
                                    : [...prev, mixer.name]
                            )}
                        />
                        <label className="form-check-label">{mixer.name}</label>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <h3>Tools</h3>
                {tools.map(tool => (
                    <div key={tool._id} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedTools.includes(tool.name)}
                            onChange={() => setSelectedTools(prev =>
                                prev.includes(tool.name)
                                    ? prev.filter(item => item !== tool.name)
                                    : [...prev, tool.name]
                            )}
                        />
                        <label className="form-check-label">{tool.name}</label>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary" onClick={handleFindRecipes}>Find Recipes</button>
            <RecipeResults recipes={recipes} />
        </div>
    );
}

export default Ingredients;
