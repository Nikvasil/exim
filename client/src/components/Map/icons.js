import L from 'leaflet';
import schoolIconUrl from '../../assets/school-icon.png';
import kindergartenIconUrl from '../../assets/kindergarten-icon.png';
import socialChildIconUrl from '../../assets/social-child-icon.png';
import socialTeenagerIconUrl from '../../assets/social-teenager-icon.png';
import homeIconUrl from '../../assets/home-icon.png';
import favouriteIconUrl from '../../assets/favourite-facility-icon.png'


const icons = {
    schools: L.icon({
        iconUrl: schoolIconUrl, iconSize: [40, 40], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    }), kindergarten: L.icon({
        iconUrl: kindergartenIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }), 'social-child-projects': L.icon({
        iconUrl: socialChildIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }), 'social-teenager-projects': L.icon({
        iconUrl: socialTeenagerIconUrl,
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }), homeAddress: L.icon({
        iconUrl: homeIconUrl, iconSize: [40, 40], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    }), favouriteFacility: L.icon({
        iconUrl: favouriteIconUrl, iconSize: [40, 40], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    }), default: L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [40, 40],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })
};


export default icons;