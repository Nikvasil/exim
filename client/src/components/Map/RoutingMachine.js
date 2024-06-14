import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';


const RoutingMachine = ({
                            start,
                            end,
                            setIsLoading
}) => {
    const map = useMap();
    const graphHopperApiKey = import.meta.env.VITE_GRAPH_HOPPER_API_KEY;

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start[0], start[1]),
                L.latLng(end[0], end[1])
            ],
            router: L.Routing.graphHopper(graphHopperApiKey),
            routeWhileDragging: true,
            addWaypoints: false,
            createMarker: function() {
                return null;
            }
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, start, end]);

    return null;
};


export default RoutingMachine;