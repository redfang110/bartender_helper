import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Spirits() {
    const [spirits, setSpirits] = useState([]);

    useEffect(() => {
        // Fetching data from the API
        async function fetchSpirits() {
            try {
                const response = await axios.get('http://localhost:4000/api/spirits'); // Adjust the URL as needed
                setSpirits(response.data);
            } catch (error) {
                console.error('Failed to fetch spirits:', error);
            }
        }

        fetchSpirits();
    }, []);

    return (
        <div>
            <h2 className="mb-4">Spirits</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {spirits.length > 0 ? (
                    spirits.map(spirit => (
                        <div key={spirit._id} className="col">
                            <div className="card">
                                <div className="image-container" style={{ maxHeight: '1000px', overflow: 'hidden' }}>
                                    <img src={spirit.imageUrl} className="card-img-top" alt={spirit.name} style={{ width: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{spirit.name}</h5>
                                    <p className="card-text"><strong>Type:</strong> {spirit.type}</p>
                                    <p className="card-text"><strong>Flavor Profile:</strong> {spirit.flavor_profile}</p>
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
