import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setError(''); // Clear error message when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData);
            setUser(response.data);
            navigate('/');
        } catch (error) {
            setError('User does not exist or invalid credentials.');
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <h1>Log In to Exim</h1>
                <label htmlFor="identifier">Email or Username</label>
                <input
                    type="text"
                    name="identifier"
                    id="identifier"
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;



