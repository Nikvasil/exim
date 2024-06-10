import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Map from '../components/Map/Map.jsx';
import AddressForm from '../components/Home/AddressForm';
import Messages from '../components/Home/Messages';
import FilterCheckbox from '../components/Home/FilterCheckbox';
import '../styles/Home.css';


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
        schools: false,
        kindergarten: false,
        'social-child-projects': false,
        'social-teenager-projects': false,
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
            schools: checked,
            kindergarten: checked,
            'social-child-projects': checked,
            'social-teenager-projects': checked,
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
            setError('Home address cannot be empty.');
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

    const selectedCategories = Object.keys(checkboxes).filter(key => checkboxes[key]);

    return (
        <div className="home-container">
            <AddressForm
                user={user}
                isEditing={isEditing}
                homeAddress={homeAddress}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setIsEditing={setIsEditing}
                oldHomeAddress={oldHomeAddress}
                setOldHomeAddress={setOldHomeAddress}
            />
            <Messages error={error} message={message} />
            <FilterCheckbox
                checkboxes={checkboxes}
                handleCheckboxChange={handleCheckboxChange}
                handleSelectAll={handleSelectAll}
                selectAll={selectAll}
            />
            <div className="home-leaflet-container">
                <Map user={user} homeCoordinates={homeCoordinates} categories={selectedCategories} />
            </div>
        </div>
    );
};


export default Home;