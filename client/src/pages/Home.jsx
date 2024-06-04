import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { grey } from '@mui/material/colors';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import '../styles/Home.css';


const Home = ({ user, setUser }) => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const [homeAddress, setHomeAddress] = useState(user ? user.homeAddress : '');
    const [isEditing, setIsEditing] = useState(false);
    const [selectAll, setSelectAll] = useState(true);
    const [checkboxes, setCheckboxes] = useState({
        schools: true,
        kindergarden: true,
        socialChildProjects: true,
        socialTeenagerProjects: true,
    });

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

    const handleChange = (e) => setHomeAddress(e.target.value);

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setCheckboxes({
            schools: checked,
            kindergarden: checked,
            socialChildProjects: checked,
            socialTeenagerProjects: checked,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes((prev) => {
            const newCheckboxes = { ...prev, [name]: checked };
            const allChecked = Object.values(newCheckboxes).every((value) => value);
            setSelectAll(allChecked);
            return newCheckboxes;
        });
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
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating home address:', error);
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

    return (
        <div className="home-container">
            <div className="home-address-container">
                {!user ? (
                    <div>
                        <HomeOutlinedIcon
                            sx={{fontSize: "3.2vh"}}
                            className="home-icon" />
                        <Link to="/register" className="home-link">
                            Sign Up
                        </Link>{' '}
                        or{' '}
                        <Link to="/login" className="home-link">
                            Log In
                        </Link>{' '}
                        to add your home address
                    </div>
                ) : (
                    !user.homeAddress || isEditing ? (
                        <div>
                            <HomeOutlinedIcon
                                sx={{fontSize: "3.2vh"}}
                                className="home-icon" />
                            Add your home address:
                            <input
                                className="home-address-input"
                                type="text"
                                name="homeAddress"
                                id="homeAddress"
                                placeholder="Mustermannstraße 1a"
                                value={homeAddress}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="submit"
                                className="home-address-button"
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                            <StyledTooltip
                                arrow
                                placement="right"
                                title="Make sure you have entered a real existing address."
                            >
                                <HelpOutlineIcon
                                    sx={{fontSize: "2.8vh"}}
                                    className="home-tooltip" />
                            </StyledTooltip>
                        </div>
                    ) : (
                        <div>
                            <HomeOutlinedIcon
                                sx={{fontSize: "3.2vh"}}
                                className="home-icon" />
                            Your home address is {user.homeAddress}
                            <button
                                type="button"
                                className="home-address-edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                <EditOutlinedIcon sx={{fontSize: "2.2vh"}} />
                            </button>
                        </div>
                    )
                )}
            </div>
            {message && (
                <div className="home-success-message">
                    <Alert
                        icon={<CheckBoxOutlinedIcon fontSize="inherit" sx={{ color: grey[100] }} />}
                        sx={{
                            color: grey[100],
                            borderRadius: '4px',
                            borderWidth: '0px',
                            borderColor: grey[900],
                            backgroundColor: grey[600],
                        }}
                        variant="outlined"
                        severity="success"
                    >
                        {message}
                    </Alert>
                </div>
            )}
            <div className="home-filter-container">
                <div className="home-filter-checkbox-container">
                    <Checkbox
                        onChange={handleSelectAll}
                        checked={selectAll}
                        sx={{
                            color: grey[600],
                            '&.Mui-checked': {
                                color: grey[400],
                            },
                        }}
                    />
                    Select All
                </div>
                {Object.keys(checkboxes).map((key) => (
                    <div className="home-filter-checkbox-container" key={key}>
                        <Checkbox
                            name={key}
                            onChange={handleCheckboxChange}
                            checked={checkboxes[key]}
                            sx={{
                                color: grey[600],
                                '&.Mui-checked': {
                                    color: grey[400],
                                },
                            }}
                        />
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </div>
                ))}
            </div>
            <div className="home-map-container">
                <div className="home-map"></div>
            </div>
        </div>
    );
};

export default Home;


