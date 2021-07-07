import L from 'leaflet';
import blueSensorPath from '../assets/sensor-blue.png';
import redSensorPath from '../assets/sensor-red.png';
import greenSensorPath from '../assets/sensor-green.png';
import locationPath from '../assets/sensor.png';

const selectIconColor = (status) => {
  if (status === 0) {
    return redSensorPath;
  }
  // SENSOR IS WORKING ☀️
  if (status === 1) {
    return greenSensorPath;
  }
  // SENSOR IS WORKING IT'S 🌨
  if (status === 2) {
    return blueSensorPath;
  }
  return locationPath;
};

// Returns a different icon depending on the type of pin and its color value
const selectIcon = (status) => {
  const iconHeight = 50;
  const iconWidth = 50;

  return new L.Icon({
    iconUrl: selectIconColor(status),
    iconAnchor: [iconWidth / 2, iconHeight],
    popupAnchor: [0, -iconHeight],
    iconSize: [iconWidth, iconHeight],
    className: 'leaflet-div-icon',
  });
};

const findCenter = (pins) => {
  // Returns a default centering value if no pins are present
  if (pins.length === 0) return [50, 0];
  // Returns the lat / lng of the first pin if only one pin
  if (pins.length === 1) return [pins[0].lat, pins[0].lng];
  // Else returns the barycenter of the n pins
  return [
    pins.reduce((acc, { lat }, _, array) => acc + lat / array.length, 0),
    pins.reduce((acc, { lng }, _, array) => acc + lng / array.length, 0),
  ];
};

const setZoom = (pins) => {
  if (pins.length <= 1) {
    return 1;
  }
  return 14;
};

export { selectIcon, findCenter, setZoom };
