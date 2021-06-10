// import axios from 'axios';
import { createContext, useState } from 'react';

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

  const [selectedLocation, setSelectedLocation] = useState('None');
  const [filteredLocation] = locationList.filter(
    (location) => location.locationName === selectedLocation
  );
  const fetchLocation = () => {
    // Fetch from the db
    /* axios.get(
      // Add db endpoint
      // Add callback
    ) */
    // Set the list to the locationList
    setLocationList(['None', 'Abidjan', 'Antibes', 'Toulouse']);
  };

  return (
    <LocationContext.Provider
      value={{
        locationList,
        fetchLocation,
        selectedLocation,
        setSelectedLocation,
        filteredLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
