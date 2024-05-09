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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Tools</h2>
            <div className="row">
                {tools.length > 0 ? (
                    tools.map(tool => (
                        <div className="col-md-6 mb-4" key={tool._id}> {/* Increased width from col-md-4 to col-md-6 */}
                            <div className="card h-100 shadow-sm">
                                <div style={{
                                    height: '300px', // Increased height for bigger images
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '20px'  // Consistent top margin
                                }}>
                                    {tool.imageUrl && (
                                        <img 
                                            src={tool.imageUrl} 
                                            alt={tool.name} 
                                            style={{
                                                width: '100%',  // Maintains full width
                                                height: '100%', // Ensures the height is fully used
                                                objectFit: 'contain', // Ensures the entire image fits within bounds without cropping
                                                objectPosition: 'center' // Center the image within the container
                                            }} 
                                        />
                                    )}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{tool.name}</h5>
                                    <p className="card-text">{tool.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="alert alert-warning">No tools found.</p>
                )}
            </div>
        </div>
    );
}

export default Tools;
