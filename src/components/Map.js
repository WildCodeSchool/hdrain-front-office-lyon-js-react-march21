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
      type: 'location',
    },

    {
      lng: -4.133333,
      lat: 5.216666,
      name: 'zef',
      description: 'ezf',
      color: 'blue',
      type: 'sensor',
    },
  ],
}) {
  return (
    <MapContainer
      center={findCenter(pins)}
      zoom={1} // {setZoom()}
      scrollWheelZoom={false}
      style={{
        height: '400px',
        width: '600px',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.length &&
        pins.map(({ name, spotName, color, lat, lng, type }) => (
          <Marker
            key={name}
            icon={selectIcon(type, color)}
            position={[lat, lng]}
          >
            <Popup>
              <h4>
                {name} {spotName}
              </h4>
              <p>{lat}</p>
              <p>{lng}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
