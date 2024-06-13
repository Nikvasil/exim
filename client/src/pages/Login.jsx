import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { grey } from '@mui/material/colors';
import PasswordVisibilityToggle from '../components/Password/PasswordVisibilityToggle';
import ErrorMessage from '../components/Password/ErrorMessage';
import '../styles/Password.css';
import '../styles/Login.css';
import '../styles/Error.css';
import '../styles/Form.css';
import {loginUser} from "../api/userApi.js";


const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
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

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            setUser(response.data);
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            navigate('/');
        } catch (error) {
            setError('User does not exist or invalid credentials.');
            console.error('Login Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
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
            <div className="password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                />
                <PasswordVisibilityToggle
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
            </div>
            <div className="login-remember-me">
                <Checkbox
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                    sx={{
                        color: grey[600],
                        '&.Mui-checked': {
                            color: grey[400],
                        },
                    }}
                />
                Remember me
            </div>
            <ErrorMessage error={error} />
            <button type="submit">Log In</button>
            <div className="login-signup-container">
                Or <Link
                to="/register"
                className="login-signup-link">
                Sign Up
            </Link> if you are not a member yet.
            </div>
        </form>
    );
};


export default Login;