import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import '../../styles/Map.css';
import icons from './icons';
import formattedDate from './formatDate';
import RoutingMachine from './RoutingMachine';
import CenterMap from './CenterMap';


const Map = ({ user, homeCoordinates, categories }) => {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleRoute = () => {
        setShowRoute(!showRoute);
    };

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const responses = await Promise.all(
                    categories.map(category => axios.get(`/api/${category}`).then(res => res.data.map(item => ({ ...item, category }))))
                );
                const allFacilities = responses.flatMap(response => response);
                setFacilities(allFacilities);
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };

        fetchFacilities();
    }, [categories]);

    return (
        <MapContainer center={[50.835, 12.929]} zoom={12} className="map-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {facilities.map((facility) => (
                <Marker
                    key={facility.id}
                    position={[facility.Y, facility.X]}
                    icon={icons[facility.category] || icons.default}
                    eventHandlers={{
                        click: () => {
                            setShowDetails(false);
                            setSelectedFacility(facility);
                        },
                    }}
                >
                    <Popup>
                        <h3>{facility.BEZEICHNUNG || facility.TRAEGER}</h3>
                        <div className="map-popup-divider"/>
                        <p className="map-show-details" onClick={handleDetails}> {!showDetails ? "Show more information"
                            : "Show less information"}</p>
                        {showDetails &&
                            <div>
                                <p>
                                    <b>Category:</b> {facility.category.charAt(0).toUpperCase() +
                                    facility.category.slice(1).replace(/([A-Z])/g, ' $1').replaceAll("-", " ")}
                                </p>
                                <p><b>Address:</b> {facility.STRASSE}</p>
                                <p><b>PLZ:</b> {`${facility.PLZ} ${facility.ORT}`}</p>
                                <p><b>Phone:</b> {facility.TELEFON}</p>
                                {facility.EMAIL &&
                                    <p><b>Email:</b> {facility.EMAIL}</p>
                                }
                                {facility.FAX &&
                                    <p><b>Fax:</b> {facility.FAX}</p>
                                }
                                {facility.CreationDate &&
                                    <p><b>Created:</b> {formattedDate(facility.CreationDate)} by {facility.Creator}</p>
                                }
                                {facility.EditDate &&
                                    <p><b>Edited:</b> {formattedDate(facility.EditDate)} by {facility.Editor}</p>
                                }
                                <p><b>Longitude:</b> {facility.X}</p>
                                <p><b>Latitude: </b> {facility.Y}</p>
                            </div>
                        }
                        {user?.homeAddress &&
                            <div className="map-button-container">
                                <button onClick={handleRoute}>{!showRoute ? "Show Route" : "Hide Route"}</button>
                            </div>
                        }
                    </Popup>
                </Marker>
            ))}
            {user && homeCoordinates && (
                <Marker
                    key="homeAddress"
                    position={homeCoordinates}
                    icon={icons.homeAddress}
                >
                    <Popup>
                        <h3>Your Home</h3>
                        <p>{user?.homeAddress}</p>
                    </Popup>
                </Marker>
            )}
            {selectedFacility && !showDetails && <CenterMap center={[selectedFacility.Y, selectedFacility.X]} />}
            {showDetails && <CenterMap center={[selectedFacility.Y + 0.008, selectedFacility.X]} />}
            {user && selectedFacility && showRoute && (
                <RoutingMachine start={homeCoordinates || [50.835, 12.929]} end={[selectedFacility.Y, selectedFacility.X]} />
            )}
        </MapContainer>
    );
};


export default Map;