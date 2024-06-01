import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                <div className="password-input-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        required
                    />
                    {showPassword ? (
                        <VisibilityOffOutlinedIcon className="visibility-icon" onClick={togglePasswordVisibility}/>
                    ) : (
                        <VisibilityOutlinedIcon className="visibility-icon" onClick={togglePasswordVisibility}/>
                    )}
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Log In</button>
                <div
                    className="login-signup"> Or <Link
                    to="/register"
                    className="login-signup-link">
                    Sign Up
                </Link> if you are not a member yet.
                </div>
            </form>
        </div>
    );
};

export default Login;



