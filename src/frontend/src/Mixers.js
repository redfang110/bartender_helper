import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mixers() {
    const [mixers, setMixers] = useState([]);

    useEffect(() => {
        // Fetching data from the API
        async function fetchMixers() {
            try {
                const response = await axios.get('http://localhost:4000/api/mixers'); // Adjust the URL as needed
                setMixers(response.data);
            } catch (error) {
                console.error('Failed to fetch mixers:', error);
            }
        }

        fetchMixers();
    }, []);

    return (
        <div>
            <h2>Mixers</h2>
            <div className="row">
                {mixers.length > 0 ? (
                    mixers.map(mixer => (
                        <div key={mixer._id} className="col-md-6 mb-4">
                            <div className="card h-100" style={{objectFit: "contain", maxHeight: 400, maxWidth: 350}}>
                                <img 
                                    src={mixer.imageUrl} 
                                    className="card-img-top" 
                                    alt={mixer.name} 
                                    style={{objectFit: "contain", maxHeight: 250, maxWidth: 250, height: "auto", width: "auto"}}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{mixer.name}</h5>
                                    <p className="card-text"><strong>Type:</strong> {mixer.type}</p>
                                    <p className="card-text"><strong>Flavor Profile:</strong> {mixer.flavorProfile}</p>
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
