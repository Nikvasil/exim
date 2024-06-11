import React, { useState } from 'react';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const FavouriteFacility = ({
                               user,
                               facility,
                               setUser,
                               favouriteFacility,
                               setFavouriteFacility
}) => {
    const [hoverFavourite, setHoverFavourite] = useState(false);

    const handleFavourite = async () => {
        try {
            const response = await axios.post('/api/users/set-favourite', { userId: user._id, facility }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            const newFavouriteFacility = response.data.favouriteFacility;
            setFavouriteFacility(newFavouriteFacility);

            const updatedUser = { ...user, favouriteFacility: newFavouriteFacility };
            setUser(updatedUser);
        } catch (error) {
            console.error('Error adding favourite facility:', error);
        }
    };

    const removeFavourite = async () => {
        try {
            const response = await axios.post('/api/users/remove-favourite', { userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setFavouriteFacility(null);

            const updatedUser = { ...user, favouriteFacility: null };
            setUser(updatedUser);
        } catch (error) {
            console.error('Error removing favourite facility:', error);
        }
    };

    return (
        <span
            className="map-favourite-icon"
            onMouseEnter={() => setHoverFavourite(true)}
            onMouseLeave={() => setHoverFavourite(false)}
        >
            {favouriteFacility && favouriteFacility._id === facility._id ? (
                hoverFavourite ? (
                    <StarBorderIcon onClick={removeFavourite} />
                ) : (
                    <StarIcon sx={{ color: "yellow" }} />
                )
            ) : (
                hoverFavourite ? (
                    <StarIcon
                        sx={{ color: "yellow" }}
                              onClick={handleFavourite}
                    />
                ) : (
                    <StarBorderIcon />
                )
            )}
        </span>
    );
};


export default FavouriteFacility;