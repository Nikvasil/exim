import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import '../styles/Password.css';
import '../styles/Error.css';
import '../styles/Form.css';


const Register = ({ setUser }) => {
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
            setError('Your password does not meet the requirements.');
            return;
        }

        try {
            const response = await axios.post('/api/users/register', formData);
            setUser(response.data);
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

    const StyledTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))`
        & .MuiTooltip-tooltip {
            font-size: 2.2vh;
            font-family: "Linux Libertine G", serif;
            text-align: justify;
            padding: 1.6vh;
            font-weight: lighter;
            background-color: #333333;
            border: white 1px solid;
            border-radius: 4px;
        }
    `;

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
                    <StyledTooltip
                        arrow
                        placement="right-start"
                        title="Make sure your password is at least 8 characters long and contains an uppercase letter, a lowercase letter, a special character, and a number."
                    >
                        <HelpOutlineIcon
                            sx={{fontSize: "2.6vh"}}
                            fontSize="small"
                            className="password-tooltip" />
                    </StyledTooltip>
                </div>
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        required
                    />
                    {showPassword ? (
                        <VisibilityOffOutlinedIcon
                            sx={{fontSize: "3vh"}}
                            className="password-visibility-icon"
                            onClick={togglePasswordVisibility} />
                    ) : (
                        <VisibilityOutlinedIcon
                            sx={{fontSize: "3vh"}}
                            className="password-visibility-icon"
                            onClick={togglePasswordVisibility} />
                    )}
                </div>
                {error && (
                    <p className="error-message">
                        <ErrorOutlineOutlinedIcon
                            sx={{fontSize: "2.6vh"}}
                            fontSize="small"
                            className="error-outline-outlined-icon" />
                        {error}
                    </p>
                )}
                <button type="submit">Sign Up</button>
            </form>
    );
};

export default Register;