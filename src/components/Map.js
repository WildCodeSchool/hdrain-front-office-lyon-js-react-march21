import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import blueSensorPath from '../assets/sensor-blue.png';
import redSensorPath from '../assets/sensor-red.png';
import greenSensorPath from '../assets/sensor-green.png';
import locationPath from '../assets/sensor.png';

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

export default function Map({
  pins = [
    {
      lng: -4.033333,
      lat: 5.316666,
      name: 'Abidjan',
      description: 'The weather is nice this time of year',
      color: 'green',
      type: 'sensor',
    },
    {
      lng: -4.133333,
      lat: 5.216666,
      name: 'zef',
      description: 'ezf',
      color: 'blue',
      type: 'location',
    },
  ],
}) {
  return (
    <MapContainer
      center={findCenter(pins)}
      zoom={pins.length <= 1 ? 13 : 11}
      scrollWheelZoom={false}
      style={{
        height: '400px',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.length &&
        pins.map(({ name, description, color, lat, lng, type }) => (
          <Marker
            key={name}
            icon={selectIcon(type, color)}
            position={[lat, lng]}
          >
            <Popup>
              <h4>{name}</h4>
              <p>{description}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
