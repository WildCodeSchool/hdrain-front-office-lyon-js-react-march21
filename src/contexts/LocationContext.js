import { createContext, useState } from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [locationList, setLocationList] = useState([
    {
      locationName: 'None',
      locationId: 0,
    },
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
  ]);
  const location = useLocation();
  const history = useHistory();

  const queryParams = qs.parse(location.search);
  const selectedLocationId = queryParams.locationId;
  const isParamsEmpty = Object.keys(queryParams).length === 0;

  const fetchLocation = () => {
    // Fetch from the db
    /* axios.get(
      // Add db endpoint
      // Add callback
    ) */
    // Set the list to the locationList
    setLocationList(['None', 'Abidjan', 'Antibes', 'Toulouse']);
  };

  const setLocationId = (id) => {
    history.push(`${location.pathname}?locationId=${id}`);
  };

  return (
    <LocationContext.Provider
      value={{
        locationList,
        fetchLocation,
        selectedLocationId,
        setLocationId,
        isParamsEmpty,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
