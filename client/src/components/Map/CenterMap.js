import { useEffect } from 'react';
import { useMap } from 'react-leaflet';


const CenterMap = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.setView(center, 15);
        }
    }, [center, map]);

    return null;
};


export default CenterMap;