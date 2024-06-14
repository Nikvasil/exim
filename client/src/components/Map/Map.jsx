import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../../styles/Map.css';
import icons from './icons';
import RoutingMachine from './RoutingMachine';
import CenterMap from './CenterMap';
import PopupContent from './PopupContent';
import {getFacilities} from "../../api/facilityApi.js";


const Map = ({
                 user,
                 homeCoordinates,
                 categories,
                 setUser,
                 selectedFacility,
                 setSelectedFacility,
                 favouriteFacility,
                 setFavouriteFacility,
                 setIsLoading
             }) => {
    const [facilities, setFacilities] = useState([]);
    const [showRoute, setShowRoute] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleRoute = () => {
        setShowRoute(!showRoute);
    };

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const responses = await getFacilities(categories);
                const allFacilities = responses.flatMap(response => response);
                setFacilities(allFacilities);
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };

        fetchFacilities();
    }, [categories]);

    return (
        <MapContainer
            center={[50.835, 12.929]}
            zoom={12}
            className="map-container"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {facilities
                .filter(facility => !favouriteFacility || facility._id !== favouriteFacility._id)
                .map((facility) => {
                    const isFavourite = facility._id === favouriteFacility?._id;
                    const icon = isFavourite ? icons.favouriteFacility : icons[facility.category] || icons.default;

                    return (
                        <Marker
                            key={facility._id}
                            position={[facility.Y, facility.X]}
                            icon={icon}
                            eventHandlers={{
                                click: () => {
                                    setShowDetails(false);
                                    setSelectedFacility(facility);
                                },
                            }}
                        >
                            <Popup eventHandlers={{ remove: () => setSelectedFacility(null) }}>
                                <PopupContent
                                    facility={facility}
                                    user={user}
                                    setUser={setUser}
                                    favouriteFacility={favouriteFacility}
                                    setFavouriteFacility={setFavouriteFacility}
                                    showDetails={showDetails}
                                    setShowDetails={setShowDetails}
                                    handleRoute={handleRoute}
                                    showRoute={showRoute}
                                />
                            </Popup>
                        </Marker>
                    );
                })}
            {user && homeCoordinates && (
                <Marker
                    key="homeAddress"
                    position={homeCoordinates}
                    icon={icons.homeAddress}
                >
                    <Popup eventHandlers={{ remove: () => setSelectedFacility(null) }}>
                        <h3>Your Home</h3>
                        <p>{user?.homeAddress}</p>
                    </Popup>
                </Marker>
            )}
            {user && favouriteFacility && (
                <Marker
                    key="favouriteFacility"
                    position={[
                        favouriteFacility.Y,
                        favouriteFacility.X
                    ]}
                    icon={icons.favouriteFacility}
                    eventHandlers={{
                        click: () => {
                            setShowDetails(false);
                            setSelectedFacility(favouriteFacility);
                        },
                    }}
                >
                    <Popup eventHandlers={{ remove: () => setSelectedFacility(null) }}>
                        <PopupContent
                            facility={favouriteFacility}
                            user={user}
                            setUser={setUser}
                            favouriteFacility={favouriteFacility}
                            setFavouriteFacility={setFavouriteFacility}
                            showDetails={showDetails}
                            setShowDetails={setShowDetails}
                            handleRoute={handleRoute}
                            showRoute={showRoute}
                            setIsLoading={setIsLoading}
                        />
                    </Popup>
                </Marker>
            )}
            {selectedFacility && !showDetails &&
                <CenterMap center={[selectedFacility.Y, selectedFacility.X]} />}
            {selectedFacility && showDetails &&
                <CenterMap center={[selectedFacility.Y + 0.008, selectedFacility.X]} />}
            {user && showRoute && (
                <RoutingMachine
                    start={homeCoordinates || [50.835, 12.929]}
                    end={[selectedFacility.Y, selectedFacility.X]}
                    setIsLoading={setIsLoading}
                />
            )}
        </MapContainer>
    );
};


export default Map;