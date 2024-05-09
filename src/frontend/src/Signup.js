import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/users/signup', { username, password });
            console.log(res.data.message);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;
