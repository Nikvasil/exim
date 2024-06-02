import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { grey } from '@mui/material/colors';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Checkbox from '@mui/material/Checkbox';


const Home = ({ user, setUser }) => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const [homeAddress, setHomeAddress] = useState(user ? user.homeAddress : '');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('passwordChanged')) {
            setMessage('You have successfully changed your password');
            setTimeout(() => {
                setMessage('');
                queryParams.delete('passwordChanged');
                window.history.replaceState({}, document.title, location.pathname);
            }, 3000);
        }
    }, [location]);

    const handleChange = (e) => {
        setHomeAddress(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/update-home-address', {
                userId: user._id,
                homeAddress,
            });
            setUser((prevUser) => ({ ...prevUser, homeAddress: response.data.homeAddress }));
            setIsEditing(false);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error updating home address:', error);
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
        <div className="home-container">
            <div className="home-address-container">
                {
                    !user ? (
                        <div>
                            <HomeOutlinedIcon className="home-icon"></HomeOutlinedIcon>
                            <Link
                                to="/register"
                                className="home-link"
                            >
                                Sign Up</Link> or <Link
                                to="/login"
                                className="home-link"
                                >Log In</Link> to add your home address
                        </div>
                        )
                        :
                        (
                            !user.homeAddress || isEditing ? (
                                <div>
                                    <HomeOutlinedIcon className="home-icon"></HomeOutlinedIcon>
                                    Add your home address:
                                    <input
                                        className="home-address-input"
                                        type="text"
                                        name="homeAddress"
                                        id="homeAddress"
                                        placeholder="Mustermannstraße 1a"
                                        value={user.homeAddress}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="home-address-button"
                                        onClick={handleSubmit}
                                    >Add
                                    </button>
                                    <StyledTooltip
                                        arrow placement="right"
                                        title="Make sure you have entered a real existing address.">
                                        <HelpOutlineIcon
                                            fontSize="small"
                                            className="home-tooltip" />
                                    </StyledTooltip>
                                </div>
                                ) : (
                                <div>
                                    <HomeOutlinedIcon className="home-icon"></HomeOutlinedIcon>
                                    Your home address is {user.homeAddress}
                                    <button
                                        type="submit"
                                        className="home-address-edit-button"
                                        onClick={() => setIsEditing(true)}
                                    > <EditOutlinedIcon fontSize="small"> </EditOutlinedIcon>
                                    </button>
                                </div>
                            )
                        )
                }
            </div>
            {message && (
                <div className="success-message">
                    <Alert
                        icon={<CheckBoxOutlinedIcon
                            fontSize="inherit"
                            sx={{
                                color: grey[100]
                            }} />}
                        sx={{
                            color: grey[100],
                            borderRadius: "4px",
                            borderWidth: "0px",
                            borderColor: grey[900],
                            backgroundColor: grey[600]
                        }}
                        variant="outlined"
                        severity="success">
                        {message}
                    </Alert>
                </div>
            )}
            <div className="filter-container">
                <div className="filter-checkbox-container">
                    <Checkbox
                        sx={{
                            color: grey[600],
                            '&.Mui-checked': {
                                color: grey[400],
                            },
                        }}
                    />
                    Select All
                </div>
                <div className="filter-checkbox-container">
                    <Checkbox
                        sx={{
                            color: grey[600],
                            '&.Mui-checked': {
                                color: grey[400],
                            },
                        }}
                    />
                    Schools
                </div>
                <div className="filter-checkbox-container">
                    <Checkbox
                        sx={{
                            color: grey[600],
                            '&.Mui-checked': {
                                color: grey[400],
                            },
                        }}
                    />
                    Kindergarden
                </div>
                <div className="filter-checkbox-container">
                    <Checkbox
                        sx={{
                            color: grey[600],
                            '&.Mui-checked': {
                                color: grey[400],
                            },
                        }}
                    />
                    Social Child Projects
                </div>
                <div className="filter-checkbox-container">
                    <Checkbox
                        sx={{
                            color: grey[600],
                            '&.Mui-checked': {
                                color: grey[400],
                            },
                        }}
                    />
                    Social Teenager Projects
                </div>
            </div>
            <div className="map-container">
                <div className="map">

                </div>
            </div>
        </div>
    );
};

export default Home;

