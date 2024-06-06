import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import axios from 'axios';
import '../styles/Map.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

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

const Map = ({ user, homeCoordinates, categories }) => {
    const [facilities, setFacilities] = useState([]);
    const [selectedFacility, setSelectedFacility] = useState(null);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const responses = await Promise.all(
                    categories.map(category => axios.get(`/api/${category}`))
                );
                const allFacilities = responses.flatMap(response => response.data);
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
                    eventHandlers={{
                        click: () => {
                            setSelectedFacility(facility);
                        },
                    }}
                >
                    <Popup>
                        <h3>{facility.BEZEICHNUNG}</h3>
                        <p>{facility.STRASSE}</p>
                    </Popup>
                </Marker>
            ))}
            {user && homeCoordinates && (
                <Marker
                    key="homeAddress"
                    position={homeCoordinates}
                >
                    <Popup>
                        <h3>Your Home</h3>
                        <p>{user.homeAddress}</p>
                    </Popup>
                </Marker>
            )}
            {homeCoordinates && selectedFacility && (
                <RoutingMachine start={homeCoordinates} end={[selectedFacility.Y, selectedFacility.X]} />
            )}
        </MapContainer>
    );
};

export default Map;