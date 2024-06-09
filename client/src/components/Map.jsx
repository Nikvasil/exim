import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import '../styles/Map.css';
import schoolIconUrl from '../assets/school-icon.png';
import kindergartenIconUrl from '../assets/kindergarten-icon.png';
import socialChildIconUrl from '../assets/social-child-icon.png';
import socialTeenagerIconUrl from '../assets/social-teenager-icon.png';
import homeIconUrl from '../assets/home-icon.png';

// Define custom icons for each facility type
const icons = {
    schools: L.icon({
        iconUrl: schoolIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    kindergarten: L.icon({
        iconUrl: kindergartenIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    'social-child-projects': L.icon({
        iconUrl: socialChildIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    'social-teenager-projects': L.icon({
        iconUrl: socialTeenagerIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    homeAddress: L.icon({
        iconUrl: homeIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }),
    default: L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};

// Date formatting function
const formattedDate = (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return newDate.toLocaleDateString('en-US', options).replace(/,/g, '');
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

// Component for routing
const RoutingMachine = ({ start, end }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start[0], start[1]),
                L.latLng(end[0], end[1])
            ],
            routeWhileDragging: true,
            addWaypoints: false
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, start, end]);

    return null;
};

// Component for centering the map
const CenterMap = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, 15);
        }
    }, [center, map]);

    return null;
};

const Map = ({ user, homeCoordinates, categories }) => {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleDetails = () => {
        setShowDetails(!showDetails);
    }

    const handleRoute = () => {
        setShowRoute(!showRoute);
    }

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
                    icon={icons.homeAddress} // Use a custom icon for home if desired
                >
                    <Popup>
                        <h3>Your Home</h3>
                        <p>{user?.homeAddress}</p>
                    </Popup>
                </Marker>
            )}
            {selectedFacility && !showDetails && <CenterMap center={[selectedFacility.Y, selectedFacility.X]} />}
            {showDetails && <CenterMap center={[selectedFacility.Y  + 0.008, selectedFacility.X]} />}
            {user && selectedFacility && showRoute && (
                <RoutingMachine start={homeCoordinates || [50.835, 12.929]} end={[selectedFacility.Y, selectedFacility.X]} />
            )}
        </MapContainer>
    );
};

export default Map;