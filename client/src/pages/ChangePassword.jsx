import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordVisibilityToggle from '../components/Password/PasswordVisibilityToggle';
import TooltipComponent from '../components/Password/TooltipComponent';
import ErrorMessage from '../components/Password/ErrorMessage';
import '../styles/Password.css';
import '../styles/Error.css';
import '../styles/Form.css';


const ChangePassword = ({ user }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&`])[A-Za-z\d@$!%*?&`]{8,}$/;
        return re.test(password);
    };

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
        if (!validatePassword(formData.newPassword)) {
            setError('Your password does not meet the requirements.');
            return;
        }
        try {
            const response = await axios.post('/api/users/change-password', {
                userId: user._id,
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (response.data.success) {
                navigate('/?passwordChanged=true');
            } else {
                setError(response.data.message || 'Password change failed. Please try again.');
            }
        } catch (error) {
            setError('Password change failed. Please try again.');
            console.error('Password Change Error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
            <label htmlFor="currentPassword">Current Password</label>
            <div className="password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="currentPassword"
                    id="currentPassword"
                    onChange={handleChange}
                    required
                />
                <PasswordVisibilityToggle
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
            </div>
            <div className="label-password-container">
                <label htmlFor="newPassword">New Password</label>
                <TooltipComponent title="Make sure your password is at least 8 characters long and contains an uppercase letter, a lowercase letter, a special character, and a number." />
            </div>
            <div className="password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    id="newPassword"
                    onChange={handleChange}
                    required
                />
                <PasswordVisibilityToggle
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
            </div>
            <ErrorMessage error={error} />
            <button type="submit">Change</button>
        </form>
    );
};


export default ChangePassword;