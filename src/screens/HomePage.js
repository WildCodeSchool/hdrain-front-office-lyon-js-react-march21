import { useContext, React, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
// const { id } = useParams();
import { LocationContext } from '../contexts/LocationContext';
import LocationDropdown from '../components/LocationDropDown';

export default function HomePage() {
  const { selectedLocation, filteredLocation } = useContext(LocationContext);

  console.log(filteredLocation);

  const history = useHistory();

  useEffect(() => {
    if (selectedLocation !== 'None') {
      history.push(`/${filteredLocation.locationId}`);
    } else history.push('/');
  }, [selectedLocation]);

  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <Link to={`/locations/neuralNetwork/${filteredLocation.locationId}`}>
        Go to Neural Network Page
      </Link>
      <Link to={`/locations/assimilation/${filteredLocation.locationId}`}>
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
