// src/Spirits.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Spirits() {
    const [spirits, setSpirits] = useState([]);  // State to store the spirits data

    useEffect(() => {
        async function fetchSpirits() {
            try {
                const response = await axios.get('http://localhost:4000/api/spirits');  // Modify the URL as necessary
                setSpirits(response.data);
            } catch (error) {
                console.error('Failed to fetch spirits:', error);
            }
        }
        fetchSpirits();
    }, []);

    return (
        <div>
            <h2>Spirits</h2>
            {spirits.length > 0 ? (
                <ul>
                    {spirits.map(spirit => (
                        <li key={spirit._id}>
                            <strong>{spirit.name}</strong> ({spirit.type})
                            <br />
                            Flavor Profile: {spirit.flavor_profile}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No spirits found.</p>
            )}
        </div>
    );
}

export default Spirits;
