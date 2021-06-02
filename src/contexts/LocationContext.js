// import axios from 'axios';
import { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [locationList, setLocationList] = useState([
    'None',
    'Abidjan',
    'Antibe',
    'Toulouse',
  ]);

  const [selectedLocation, setSelectedLocation] = useState('Abidjan');

  const fetchLocation = () => {
    // Fetch from the db
    /* axios.get(
      // Add db endpoint
      // Add callback
    ) */
    // Set the list to the locationList
    setLocationList(['Abidjan', 'Antibe', 'Toulouse']);
  };

  return (
    <LocationContext.Provider
      value={{
        locationList,
        fetchLocation,
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
