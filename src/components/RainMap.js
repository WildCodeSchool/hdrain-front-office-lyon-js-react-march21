import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const RainMap = () => {
  const { experiment, locationName } = useContext(LocationContext);
  return (
    <>
      <h3>Rain Map {locationName}</h3>
      {experiment?.rainMap ? (
        <img className="rainMap" src={experiment?.rainMap} alt="rainMap" />
      ) : (
        <p>No rain map available for {experiment?.timestamp}</p>
      )}
    </>
  );
};

export default RainMap;
