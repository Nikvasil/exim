import React, {useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {removeFavourite, setFavourite} from "../../api/facilityApi.js";


const FavouriteFacility = ({
                               user, facility, setUser, favouriteFacility, setFavouriteFacility, setIsLoading
                           }) => {
    const [hoverFavourite, setHoverFavourite] = useState(false);

    const handleSetFavourite = async () => {
        try {
            const response = await setFavourite(user, facility);

            const newFavouriteFacility = response.data.favouriteFacility;
            setFavouriteFacility(newFavouriteFacility);

            const updatedUser = {...user, favouriteFacility: newFavouriteFacility};
            setUser(updatedUser);
        } catch (error) {
            console.error('Error adding favourite facility:', error);
        }
    };

    const handleRemoveFavourite = async () => {
        try {
            await removeFavourite(user);

            setFavouriteFacility(null);

            const updatedUser = {...user, favouriteFacility: null};
            setUser(updatedUser);
        } catch (error) {
            console.error('Error removing favourite facility:', error);
        }
    };

    return (<span
            className="map-favourite-icon"
            onMouseEnter={() => setHoverFavourite(true)}
            onMouseLeave={() => setHoverFavourite(false)}
        >
            {favouriteFacility && favouriteFacility._id === facility._id ? (hoverFavourite ? (
                    <StarBorderIcon onClick={handleRemoveFavourite}/>) : (
                    <StarIcon sx={{color: "yellow"}}/>)) : (hoverFavourite ? (<StarIcon
                        sx={{color: "yellow"}}
                        onClick={handleSetFavourite}
                    />) : (<StarBorderIcon/>))}
        </span>);
};


export default FavouriteFacility;