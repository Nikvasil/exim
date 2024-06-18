import React from 'react';
import FavouriteFacility from './FavouriteFacility.jsx';
import formattedDate from './formatDate';


const PopupContent = ({
                          facility,
                          user,
                          setUser,
                          favouriteFacility,
                          setFavouriteFacility,
                          showDetails,
                          setShowDetails,
                          handleRoute,
                          showRoute
                      }) => {
    const handleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (<>
            <h3>{facility.BEZEICHNUNG || facility.TRAEGER}</h3>
            <div className="map-popup-divider"/>
            <p className="map-show-details" onClick={handleDetails}>
                {!showDetails ? "Show more information" : "Show less information"}
            </p>
            {showDetails && (<div>
                    <p>
                        <b>Category:</b> {facility.category.charAt(0).toUpperCase() + facility.category.slice(1).replace(/([A-Z])/g, ' $1').replaceAll("-", " ")}
                    </p>
                    <p><b>Address:</b> {facility.STRASSE}</p>
                    <p><b>PLZ:</b> {`${facility.PLZ.toString().padStart(5, '0')} ${facility.ORT}`}</p>
                    <p><b>Phone:</b> {facility.TELEFON}</p>
                    {facility.EMAIL && <p><b>Email:</b> {facility.EMAIL}</p>}
                    {facility.FAX && <p><b>Fax:</b> {facility.FAX}</p>}
                    {facility.CreationDate &&
                        <p><b>Created:</b> {formattedDate(facility.CreationDate)} by {facility.Creator}</p>}
                    {facility.EditDate && <p><b>Edited:</b> {formattedDate(facility.EditDate)} by {facility.Editor}</p>}
                    <p><b>Longitude:</b> {facility.X}</p>
                    <p><b>Latitude: </b> {facility.Y}</p>
                </div>)}
            {user && (<FavouriteFacility
                    user={user}
                    facility={facility}
                    setUser={setUser}
                    favouriteFacility={favouriteFacility}
                    setFavouriteFacility={setFavouriteFacility}
                />)}
            {user?.homeAddress && (<div className="map-button-container">
                    <button onClick={handleRoute}>
                        {!showRoute ? "Show Route" : "Hide Route"}
                    </button>
                </div>)}
        </>);
};


export default PopupContent;