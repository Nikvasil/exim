import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {setFavourite, removeFavourite} from "../../api/facilityApi.js";


const FavouriteFacility = ({
                               user,
                               facility,
                               setUser,
                               favouriteFacility,
                               setFavouriteFacility,
    setIsLoading
}) => {
    const [hoverFavourite, setHoverFavourite] = useState(false);

    const handleSetFavourite = async () => {
        try {
            setIsLoading(true);
            const response = await setFavourite(user, facility);
            setIsLoading(false);

            const newFavouriteFacility = response.data.favouriteFacility;
            setFavouriteFacility(newFavouriteFacility);

            const updatedUser = { ...user, favouriteFacility: newFavouriteFacility };
            setUser(updatedUser);
        } catch (error) {
            console.error('Error adding favourite facility:', error);
        }
    };

    const handleRemoveFavourite = async () => {
        try {
            setIsLoading(true);
            await removeFavourite(user);
            setIsLoading(false);

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
                    <StarBorderIcon onClick={handleRemoveFavourite} />
                ) : (
                    <StarIcon sx={{ color: "yellow" }} />
                )
            ) : (
                hoverFavourite ? (
                    <StarIcon
                        sx={{ color: "yellow" }}
                              onClick={handleSetFavourite}
                    />
                ) : (
                    <StarBorderIcon />
                )
            )}
        </span>
    );
};


export default FavouriteFacility;