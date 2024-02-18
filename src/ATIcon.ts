import L from 'leaflet';

const iconAT = new L.Icon({
    iconUrl: require('./rec.png'),
    iconRetinaUrl: require('./rec.png'),
    iconSize: new L.Point(16, 16),
    // className: 'leaflet-div-icon'
});

export { iconAT };