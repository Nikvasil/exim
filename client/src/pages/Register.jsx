import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
        setError('');
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&`])[A-Za-z\d@$!%*?&`]{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError('Invalid email format');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Your password does not meet the requirements..');
            return;
        }

        try {
            await axios.post('/api/users/register', formData);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
                setError('This user already exists.');
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration Error:', error);
        }
    };

    const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))`& .MuiTooltip-tooltip {
        font-size: 16px;
        font-family: "Linux Libertine G", serif;
        text-align: justify;
        padding: 16px;
        font-weight: lighter;
        background-color: #333333;
        border: white 1px solid;
        border-radius: 4px;
    }`;

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <h1>Get Started</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    required
                />
                <div className="register-password-container">
                    <label htmlFor="password">Password</label>
                    <StyledTooltip arrow title="Make sure your password is at least 8 characters long and contains an uppercase letter, a lowercase letter, a special character, and a number.">
                        <HelpOutlineIcon fontSize="small" className="password-icon" />
                    </StyledTooltip>
                </div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Register;


