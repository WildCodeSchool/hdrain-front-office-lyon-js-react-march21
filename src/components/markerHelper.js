import L from 'leaflet';
import blueSensorPath from '../assets/sensor-blue.png';
import redSensorPath from '../assets/sensor-red.png';
import greenSensorPath from '../assets/sensor-green.png';
import locationPath from '../assets/sensor.png';

// Returns a different icon depending on the type of pin and its color value
const selectIcon = (type, color = 'none') => {
  let iconPath = '';
  if (type === 'location') {
    iconPath = locationPath;
  } else {
    if (color === 'red') {
      iconPath = redSensorPath;
    }
    if (color === 'green') {
      iconPath = greenSensorPath;
    }
    if (color === 'blue') {
      iconPath = blueSensorPath;
    }
  }

  const iconHeight = 50;
  const iconWidth = 50;

  return new L.Icon({
    iconUrl: iconPath,
    iconRetinaUrl: iconPath,
    iconAnchor: [iconWidth / 2, iconHeight],
    popupAnchor: [0, -iconHeight],
    iconSize: [iconWidth, iconHeight],
    className: 'leaflet-div-icon',
  });
};

const findCenter = (pins) => {
  // Returns a default centering value if no pins are present
  if (pins.length < 1) return [50, 0];
  // Returns the lat / lng of the first pin if only one pin
  if (pins.length === 1) return [pins[0].lat, pins[0].lng];
  // Else returns the barycenter of the n pins
  return [
    pins.reduce((acc, { lat }, _, array) => acc + lat / array.length, 0),
    pins.reduce((acc, { lng }, _, array) => acc + lng / array.length, 0),
  ];
};

export { selectIcon, findCenter };
