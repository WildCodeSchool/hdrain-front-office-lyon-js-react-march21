import { useContext, React } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import LocationDropdown from '../components/LocationDropDown';

export default function HomePage() {
  const { selectedLocation } = useContext(LocationContext);
  const locationList = [
    {
      locationName: 'Abidjan',
      locationId: 1,
    },
    {
      locationName: 'Antibes',
      locationId: 2,
    },
    {
      locationName: 'Toulouse',
      locationId: 3,
    },
  ];
  const [filteredLocation] = locationList.filter(
    (location) => location.locationName === selectedLocation
  );

  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <Link to={`/location/neuralnetwork/${filteredLocation.locationId}`}>
        Go to Neural Network Page
      </Link>
      <Link to={`/location/assimilation/${filteredLocation.locationId}`}>
        Go to Assimilation Page
      </Link>

      <NavLink to={`/history/${filteredLocation.locationId}`}>
        Go to History Page
      </NavLink>
      <br />
      <div>
        <img
          src="https://www.kindpng.com/picc/m/331-3317031_simple-silhouette-world-map-hd-png-download.png"
          alt="worldmap"
        />
      </div>
    </>
  );
}
