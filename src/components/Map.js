import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { selectIcon, findCenter } from './markerHelper';

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