import { React, useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';
import API from '../APIClient';
import LocationDropdown from '../components/LocationDropDown';
import Map from '../components/Map';

export default function HomePage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    API.get('/locations')
      .then((response) => setLocations(response.data))
      .catch(window.console.error);
  }, []);

  const { selectedLocationId } = useContext(LocationContext);
  return (
    <>
      <h2>Home</h2>
      <LocationDropdown />
      <Link
        className="link"
        to={`/locations/neuralNetwork?locationId=${selectedLocationId}`}
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Neural Network Page
      </Link>
      <Link
        className="link"
        to={`/locations/assimilation?locationId=${selectedLocationId}`}
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Assimilation Page
      </Link>
      <NavLink
        className="link"
        to={`/history?locationId=${selectedLocationId}&timestamp=`}
        style={
          !selectedLocationId || selectedLocationId === 'None'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to History Page
      </NavLink>
      <div>{locations.length > 0 && <Map pins={locations} />}</div>
    </>
  );
}
