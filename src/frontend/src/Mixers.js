// src/Mixers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mixers() {
    const [mixers, setMixers] = useState([]); // State to store the mixers data

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
            {mixers.length > 0 ? (
                <ul>
                    {mixers.map(mixer => (
                        <li key={mixer._id}>
                            <strong>{mixer.name}</strong> ({mixer.type})
                            <br />
                            Flavor Profile: {mixer.flavor_profile}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No mixers found.</p>
            )}
        </div>
    );
}

export default Mixers;
