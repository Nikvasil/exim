import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PasswordVisibilityToggle from '../components/Password/PasswordVisibilityToggle';
import ErrorMessage from '../components/Password/ErrorMessage';
import TooltipComponent from '../components/Password/TooltipComponent';
import '../styles/Password.css';
import '../styles/Error.css';
import '../styles/Form.css';
import '../api/userApi.js';
import {registerUser} from "../api/userApi.js";


const Register = ({
                      setUser,
                      setIsLoading
}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
        setError('');
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]{8,}$/;
        return re.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError('Invalid email format');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Your password does not meet the requirements.');
            return;
        }

        try {
            setIsLoading(true);
            const response = await registerUser(formData);
            setIsLoading(false);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
                setError('This user already exists.');
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
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
            <div className="label-password-container">
                <label htmlFor="password">Password</label>
                <TooltipComponent
                    arrow
                    placement="right-start"
                    title="Make sure your password is at least 8 characters long and contains an uppercase letter, a lowercase letter, a special character, and a number.">
                    <HelpOutlineIcon
                        sx={{ fontSize: "2.6vh" }}
                        fontSize="small"
                        className="password-tooltip"
                    />
                </TooltipComponent>
            </div>
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
            <ErrorMessage error={error} />
            <button type="submit">Sign Up</button>
        </form>
    );
};


export default Register;