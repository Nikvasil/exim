import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
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
import '../styles/Error.css';
import Map from '../components/Map.jsx';


const Home = ({ user, setUser }) => {
    const [message, setMessage] = useState('');
    const location = useLocation();
    const [homeAddress, setHomeAddress] = useState(user ? user.homeAddress : '');
    const [isEditing, setIsEditing] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [homeCoordinates, setHomeCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [oldHomeAddress, setOldHomeAddress] = useState(user ? user.homeAddress : '');
    const [checkboxes, setCheckboxes] = useState({
        "schools": false,
        "kindergarten": false,
        "social-child-projects": false,
        "social-teenager-projects": false,
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

    const handleChange = (e) => {
        setError(null); // Reset error message on change
        setHomeAddress(e.target.value);
    };

    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        setCheckboxes({
            "schools": checked,
            "kindergarten": checked,
            "social-child-projects": checked,
            "social-teenager-projects": checked,
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

        // Check for empty input
        if (!homeAddress.trim()) {
            setError("Home address cannot be empty.");
            setMessage(null); // Clear any previous success message
            setTimeout(() => setError(''), 3000);
            return;
        }

        try {
            const coordinates = await getCoordinates(homeAddress);
            setHomeCoordinates([coordinates.lat, coordinates.lon]);

            const response = await axios.post('/api/users/update-home-address', {
                userId: user._id,
                homeAddress,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setUser((prevUser) => ({ ...prevUser, homeAddress: response.data.homeAddress }));
            setOldHomeAddress(response.data.homeAddress); // Update old address to the new one
            setIsEditing(false);
            setError(null); // Clear any previous error message
            setMessage('Home address updated successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage(null); // Clear any previous success message
            setError("Unfortunately, we couldn't find your home.");
            setIsEditing(false);
            setTimeout(() => setError(''), 3000);
            setHomeAddress(oldHomeAddress); // Revert to the old address
            console.error('Error updating home address:', error);
        }
    };

    useEffect(() => {
        const fetchHomeCoordinates = async () => {
            if (user && user.homeAddress) {
                try {
                    const coordinates = await getCoordinates(user.homeAddress);
                    setError(null);
                    setHomeCoordinates([coordinates.lat, coordinates.lon]);
                } catch (error) {
                    setError("Unfortunately, we couldn't find your home.");
                    setIsEditing(false);
                    setTimeout(() => setError(''), 3000);
                    console.error('Error fetching home coordinates:', error);
                }
            }
        };

        fetchHomeCoordinates();
    }, [user]);

    const getCoordinates = async (address) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURIComponent(address)}&city=Chemnitz`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                return { lat, lon };
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
            throw error;
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

    // Extract selected categories
    const selectedCategories = Object.keys(checkboxes).filter(key => checkboxes[key]);

    return (
        <div className="home-container">
            <div className="home-address-container">
                {!user ? (
                    <div>
                        <HomeOutlinedIcon
                            sx={{ fontSize: "3.2vh" }}
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
                                className="home-icon"/>
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
                            <button
                                type="button"
                                className="home-address-button"
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                }}
                            >
                                X
                            </button>
                            <StyledTooltip
                                arrow
                                placement="right"
                                title="Make sure you have entered a real existing address."
                            >
                                <HelpOutlineIcon
                                    sx={{fontSize: "2.8vh"}}
                                    className="home-tooltip"/>
                            </StyledTooltip>
                        </div>
                    ) : (
                        <div>
                            <HomeOutlinedIcon
                                sx={{fontSize: "3.2vh"}}
                                className="home-icon"/>
                            Your home address is {user.homeAddress}
                            <button
                                type="button"
                                className="home-address-edit-button"
                                onClick={() => {
                                    setOldHomeAddress(user.homeAddress);
                                    setHomeAddress(user.homeAddress);
                                    setIsEditing(!isEditing);
                                }}
                            >
                                <EditOutlinedIcon sx={{ fontSize: "2.2vh" }} />
                            </button>
                        </div>
                    )
                )}
            </div>
            {error && (
                <div className="home-message">
                    <Alert
                        variant="filled"
                        severity="error"
                    >
                        {error}
                    </Alert>
                </div>
            )}
            {message && (
                <div className="home-message">
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
                        {(key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')).replaceAll("-", " ")}
                    </div>
                ))}
            </div>
            <div className="home-leaflet-container">
                <Map user={user} homeCoordinates={homeCoordinates} categories={selectedCategories} />
            </div>
        </div>
    );
};

export default Home;