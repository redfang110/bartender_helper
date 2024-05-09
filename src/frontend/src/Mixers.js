import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mixers({ userId }) {
    const [mixers, setMixers] = useState([]);
    const [filteredMixers, setFilteredMixers] = useState([]);
    const [showMixers, setShowMixers] = useState([]);
    const [userMixers, setUserMixers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchMixers() {
            try {
                const response = await axios.get('http://localhost:4000/api/mixers'); // Adjust the URL as needed
                setMixers(response.data);

                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserMixers(user.data.mixers);
            } catch (error) {
                console.error('Failed to fetch mixers:', error);
            }
        }

        fetchMixers();
    }, []);

    const handleAddRemoveMixer = async (mixerName) => {
        if (!userMixers.includes(mixerName)) {
            try {
                const addMixer = {
                    userId: userId,
                    mixer: mixerName
                }
                await axios.post('http://localhost:4000/api/users/add-mixer', addMixer);

                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserMixers(user.data.mixers);
            } catch (error) {
                console.error('Failed to add mixer:', error);
            }
        } else {
            try {
                const removeMixer = {
                    userId: userId,
                    mixer: mixerName
                }
                await axios.post('http://localhost:4000/api/users/remove-mixer', removeMixer);

                const user = await axios.get('http://localhost:4000/api/users/' + userId);
                setUserMixers(user.data.mixers);
            } catch (error) {
                console.error('Failed to add mixer:', error);
            }
        }
    }

    const updateSearch = () => {
        if (searchTerm != '') {
            let newFilteredMixers = [];
            mixers.forEach(function(mixer) {
                if (mixer.name && mixer.name.toLowerCase().includes(searchTerm.toLowerCase()) && !newFilteredMixers.includes(mixer)) {
                    newFilteredMixers.push(mixer);
                }
                if (mixer.description && mixer.description.toLowerCase().includes(searchTerm.toLowerCase()) && !newFilteredMixers.includes(mixer)) {
                    newFilteredMixers.push(mixer);
                }
                if (mixer.flavor_profile && mixer.flavor_profile.toLowerCase().includes(searchTerm.toLowerCase()) && !newFilteredMixers.includes(mixer)) {
                    newFilteredMixers.push(mixer);
                }
            });
            setFilteredMixers(newFilteredMixers);
            setShowMixers(newFilteredMixers);
        }
    }

    useEffect(() => {
        updateSearch();
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm == '') {
            setShowMixers(mixers);
        }
    });

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '600px', borderRadius: 20, paddingLeft: 10, margin: 10 }} /> <br />
            </div>
            <h2 className="mb-4">Mixers</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {showMixers.length > 0 ? (
                    showMixers.map(mixer => (
                        <div key={mixer._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{maxHeight: 400, maxWidth: 350, textAlign: "center"}}>
                                    <img src={mixer.imageUrl} className="card-img-top" alt={mixer.name} style={{objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto"}}/>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{mixer.name}</h5>
                                    <p className="card-text"><strong>Type:</strong> {mixer.type}</p>
                                    <p className="card-text"><strong>Flavor Profile:</strong> {mixer.flavor_profile}</p>
                                    <button onClick={() => handleAddRemoveMixer(mixer.name)} style={{ fontWeight: "bold", borderRadius: 20, backgroundColor: !userMixers.includes(mixer.name) ? "blue" : "gray", color: "white"}}>Mark Owned</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No mixers found.</p>
                )}
            </div>
        </div>
    );
}

export default Mixers;
