import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';


const RoutingMachine = ({
                            start,
                            end
}) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(start[0], start[1]),
                L.latLng(end[0], end[1])
            ],
            router: L.Routing.graphHopper('da6f61f1-ce45-468f-b402-8cad4a75befa'),
            routeWhileDragging: true,
            addWaypoints: false
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, start, end]);

    return null;
};


export default RoutingMachine;