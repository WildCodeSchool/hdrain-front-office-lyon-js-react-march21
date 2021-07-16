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
        to={`/neuralNetwork?locationId=${selectedLocationId}`}
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Go to Neural Network Page
      </Link>
      <Link
        className="link"
        to={`/assimilation?locationId=${selectedLocationId}`}
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Go to Data Assimilation Page
      </Link>
      <NavLink
        className="link"
        to={`/history?locationId=${selectedLocationId}`}
        style={!selectedLocationId ? { pointerEvents: 'none' } : null}
      >
        Go to History Page
      </NavLink>
      <>{!!locations.length && <Map pins={locations} />}</>
    </>
  );
}
