import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mixers() {
    const [mixers, setMixers] = useState([]);

    useEffect(() => {
        async function fetchMixers() {
            try {
                const response = await axios.get('http://localhost:4000/api/mixers');
                setMixers(response.data);
            } catch (error) {
                console.error('Failed to fetch mixers:', error);
            }
        }

        fetchMixers();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Mixers</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {mixers.length > 0 ? (
                    mixers.map(mixer => (
                        <div key={mixer._id} className="col">
                            <div className="card h-100">
                                <div style={{
                                    height: '250px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '20px'  // Adding top margin
                                }}>
                                    <img 
                                        src={mixer.imageUrl} 
                                        alt={mixer.name} 
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                                    />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{mixer.name}</h5>
                                    <p className="card-text"><strong>Type:</strong> {mixer.type}</p>
                                    <p className="card-text"><strong>Flavor Profile:</strong> {mixer.flavorProfile}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-warning" role="alert">
                        No mixers found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Mixers;
