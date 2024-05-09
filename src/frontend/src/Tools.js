import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tools({ userId }) {
    const [tools, setTools] = useState([]);
    const [showTools, setShowTools] = useState([]);
    const [userTools, setUserTools] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showOnlyOwned, setShowOnlyOwned] = useState(false); // State to control the visibility of only owned tools

    useEffect(() => {
        async function fetchTools() {
            try {
                const response = await axios.get('http://localhost:4000/api/tools');
                setTools(response.data);

                const user = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUserTools(user.data.tools);
            } catch (error) {
                console.error('Failed to fetch tools:', error);
            }
        }

        fetchTools();
    }, [userId]);

    useEffect(() => {
        const filtered = showOnlyOwned
            ? tools.filter(tool => userTools.includes(tool.name))
            : tools;
        setShowTools(filtered);
    }, [tools, userTools, showOnlyOwned]);

    const handleAddRemoveTool = async (toolName) => {
        if (!userTools.includes(toolName)) {
            try {
                await axios.post('http://localhost:4000/api/users/add-tool', { userId, tool: toolName });
            } catch (error) {
                console.error('Failed to add tool:', error);
            }
        } else {
            try {
                await axios.post('http://localhost:4000/api/users/remove-tool', { userId, tool: toolName });
            } catch (error) {
                console.error('Failed to remove tool:', error);
            }
        }
        const user = await axios.get(`http://localhost:4000/api/users/${userId}`);
        setUserTools(user.data.tools);
    };

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ width: '600px', borderRadius: 20, paddingLeft: 10, margin: 10 }}
                />
                <br />
                <button
                    onClick={() => setShowOnlyOwned(!showOnlyOwned)}
                    style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: showOnlyOwned ? "gray" : "blue", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                >
                    {showOnlyOwned ? 'Show All Tools' : 'Show Only Owned Tools'}
                </button>
            </div>
            <h2 className="mb-4">Tools</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {showTools.length > 0 ? (
                    showTools.map(tool => (
                        <div key={tool._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{ maxHeight: 400, maxWidth: 350, textAlign: "center" }}>
                                    <img src={tool.imageUrl} className="card-img-top" alt={tool.name} style={{ objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto" }}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{tool.name}</h5>
                                    <p className="card-text"><strong>Type:</strong> {tool.type}</p>
                                    <p className="card-text"><strong>Flavor Profile:</strong> {tool.flavor_profile}</p>
                                    <button
                                        onClick={() => handleAddRemoveTool(tool.name)}
                                        style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !userTools.includes(tool.name) ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}
                                    >
                                        Mark Owned
                                    </button>
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
