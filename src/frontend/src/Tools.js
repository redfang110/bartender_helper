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
        <div className="container">
            <h2 className="my-4">Tools</h2>
            <div className="row">
                {tools.length > 0 ? (
                    tools.map(tool => (
                        <div className="col-md-4" key={tool._id}>
                            <div className="card mb-4 shadow-sm">
                                {tool.imageUrl && (
                                    <img src={tool.imageUrl} alt={tool.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{tool.name}</h5>
                                    <p className="card-text">{tool.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tools found.</p>
                )}
            </div>
        </div>
    );
}

export default Tools;
