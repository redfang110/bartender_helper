import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ingredients({ setRecipes }) {
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
                // Optionally, handle this error in the UI, e.g., by showing an error message
            }
        };
        fetchData();
    }, []);

    const handleFindRecipes = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/recipes/find', {
                spirits: selectedSpirits,
                mixers: selectedMixers,
                tools: selectedTools
            });
            setRecipes(response.data);
        } catch (error) {
            console.error('Failed to find recipes:', error);
            // Optionally, handle this error in the UI
        }
    };

    return (
        <div>
            <h2>Select Ingredients</h2>
            <div>
                <h3>Spirits</h3>
                {spirits.map(spirit => (
                    <div key={spirit._id}>
                        <input
                            type="checkbox"
                            checked={selectedSpirits.includes(spirit.name)}
                            onChange={() => setSelectedSpirits(prev =>
                                prev.includes(spirit.name)
                                    ? prev.filter(item => item !== spirit.name)
                                    : [...prev, spirit.name]
                            )}
                        /> {spirit.name}
                    </div>
                ))}
            </div>
            <div>
                <h3>Mixers</h3>
                {mixers.map(mixer => (
                    <div key={mixer._id}>
                        <input
                            type="checkbox"
                            checked={selectedMixers.includes(mixer.name)}
                            onChange={() => setSelectedMixers(prev =>
                                prev.includes(mixer.name)
                                    ? prev.filter(item => item !== mixer.name)
                                    : [...prev, mixer.name]
                            )}
                        /> {mixer.name}
                    </div>
                ))}
            </div>
            <div>
                <h3>Tools</h3>
                {tools.map(tool => (
                    <div key={tool._id}>
                        <input
                            type="checkbox"
                            checked={selectedTools.includes(tool.name)}
                            onChange={() => setSelectedTools(prev =>
                                prev.includes(tool.name)
                                    ? prev.filter(item => item !== tool.name)
                                    : [...prev, tool.name]
                            )}
                        /> {tool.name}
                    </div>
                ))}
            </div>
            <button onClick={handleFindRecipes}>Find Recipes</button>
        </div>
    );
}

export default Ingredients;
