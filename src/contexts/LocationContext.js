import { createContext, useState } from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [experiment, setExperiment] = useState({});
  const [locationList, setLocationList] = useState([
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

  const fetchLocation = () => {
    setLocationList(['None', 'Abidjan', 'Antibes', 'Toulouse']);
  };

  const setLocationId = (id) => {
    history.push(`${location.pathname}?locationId=${id}`);
  };

  const locationName = locationList
    .filter(
      (locationSite) =>
        locationSite.locationId === parseInt(selectedLocationId, 10)
    )
    .map((id) => `- ${id.locationName}`);
  return (
    <LocationContext.Provider
      value={{
        locationList,
        fetchLocation,
        selectedLocationId,
        setLocationId,
        experiment,
        setExperiment,
        locationName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
