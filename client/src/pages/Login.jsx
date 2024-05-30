import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData);
            setUser(response.data);
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="identifier"
                    placeholder="Email or Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};


export default Login;


