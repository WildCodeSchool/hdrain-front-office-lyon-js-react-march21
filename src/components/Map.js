import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map({
  pin = {
    lng: -4.033333,
    lat: 5.316667,
    name: 'Abidjan',
    description: 'The weather is nice this time of year',
  },
}) {
  const { lng, lat, name, description } = pin;
  const coordinates = [lat, lng];
  return (
    <MapContainer
      style={{ height: '400px' }}
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>
          <h4>{name}</h4>
          <p>{description}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
