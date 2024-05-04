// src/Tools.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tools() {
    const [tools, setTools] = useState([]); // State to store the tools data

    useEffect(() => {
        async function fetchTools() {
            try {
                const response = await axios.get('http://localhost:4000/api/tools'); // Adjust this URL to your API
                setTools(response.data);
            } catch (error) {
                console.error('Failed to fetch tools:', error);
            }
        }

        fetchTools();
    }, []);

    return (
        <div>
            <h2>Tools</h2>
            {tools.length > 0 ? (
                <ul>
                    {tools.map(tool => (
                        <li key={tool._id}>
                            <strong>{tool.name}</strong>
                            <p>{tool.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tools found.</p>
            )}
        </div>
    );
}

export default Tools;
