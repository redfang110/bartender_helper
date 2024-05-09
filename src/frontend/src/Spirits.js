import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Spirits({ userId }) {
    const [spirits, setSpirits] = useState([]);
    const [filteredSpirits, setFilteredSpirits] = useState([]);
    const [showSpirits, setShowSpirits] = useState([]);
    const [userSpirits, setUserSpirits] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchSpirits() {
            try {
                const response = await axios.get('http://localhost:4000/api/spirits'); // Adjust the URL as needed
                setSpirits(response.data);

                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserSpirits(user.data.spirits);
            } catch (error) {
                console.error('Failed to fetch spirits:', error);
            }
        }

        fetchSpirits();
    }, []);

    const handleAddRemoveSpirit = async (spiritName) => {
        if (!userSpirits.includes(spiritName)) {
            try {
                const addSpirit = {
                    userId: userId,
                    spirit: spiritName
                }
                await axios.post('http://localhost:4000/api/users/add-spirit', addSpirit);

                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserSpirits(user.data.spirits);
            } catch (error) {
                console.error('Failed to add spirit:', error);
            }
        } else {
            try {
                const removeSpirit = {
                    userId: userId,
                    spirit: spiritName
                }
                await axios.post('http://localhost:4000/api/users/remove-spirit', removeSpirit);

                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserSpirits(user.data.spirits);
            } catch (error) {
                console.error('Failed to add spirit:', error);
            }
        }
    }

    const updateSearch = () => {
        if (searchTerm != '') {
            let newFilteredSpirits = [];
            spirits.forEach(function(spirit) {
                if (spirit.name && spirit.name.toLowerCase().includes(searchTerm.toLowerCase()) && !newFilteredSpirits.includes(spirit)) {
                    newFilteredSpirits.push(spirit);
                }
                if (spirit.description && spirit.description.toLowerCase().includes(searchTerm.toLowerCase()) && !newFilteredSpirits.includes(spirit)) {
                    newFilteredSpirits.push(spirit);
                }
                if (spirit.flavor_profile && spirit.flavor_profile.toLowerCase().includes(searchTerm.toLowerCase()) && !newFilteredSpirits.includes(spirit)) {
                    newFilteredSpirits.push(spirit);
                }
            });
            setFilteredSpirits(newFilteredSpirits);
            setShowSpirits(newFilteredSpirits);
        }
    }

    useEffect(() => {
        updateSearch();
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm == '') {
            setShowSpirits(spirits);
        }
    });

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '600px', borderRadius: 20, paddingLeft: 10, margin: 10 }} /> <br />
            </div>
            <h2 className="mb-4">Spirits</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {showSpirits.length > 0 ? (
                    showSpirits.map(spirit => (
                        <div key={spirit._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{maxHeight: 400, maxWidth: 350, textAlign: "center"}}>
                                    <img src={spirit.imageUrl} className="card-img-top" alt={spirit.name} style={{objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto"}}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{spirit.name}</h5>
                                    <p className="card-text"><strong>Type:</strong> {spirit.type}</p>
                                    <p className="card-text"><strong>Flavor Profile:</strong> {spirit.flavor_profile}</p>
                                    <button onClick={() => handleAddRemoveSpirit(spirit.name)} style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !userSpirits.includes(spirit.name) ? "blue" : "gray", color: "white", marginLeft: 10, marginRight: 10, marginTop: 10}}>Mark Owned</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No spirits found.</p>
                )}
            </div>
        </div>
    );
}

export default Spirits;
