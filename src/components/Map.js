import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { selectIcon, findCenter, setZoom } from './markerHelper';

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export default function Map({
  pins = [
    {
      lng: -4.033333,
      lat: 5.316666,
      name: 'Abidjan',
      description: 'The weather is nice this time of year',
      type: 'location',
    },

    {
      lng: -4.133333,
      lat: 5.216666,
      name: 'zef',
      description: 'ezf',
      code: 2,
      type: 'sensor',
    },
  ],
}) {
  return (
    <>
      {!!pins.length && (
        <MapContainer
          center={findCenter(pins)}
          zoom={setZoom(pins)}
          style={{
            height: '400px',
            width: '800px',
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {pins.map(({ name, sensorNumber, spotName, status, lat, lng }) => (
            <Marker key={name} icon={selectIcon(status)} position={[lat, lng]}>
              <Popup>
                <h4>{spotName ? capitalizeFirstLetter(spotName) : name}</h4>
                {sensorNumber ? <p>Sensor # {sensorNumber}</p> : null}
                <p>Latitude : {lat}</p>
                <p>Longitude : {lng}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
}
