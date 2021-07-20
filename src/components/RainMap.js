import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const RainMap = ({ width = 500, height = 500 }) => {
  const { experiment, locationName } = useContext(LocationContext);
  return (
    <>
      <h3>Rain Map {locationName}</h3>
      {experiment?.rainMap ? (
        <img
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="rainMap"
          src={experiment?.rainMap}
          alt="rainMap"
        />
      ) : (
        <p>No rain map available for {experiment?.timestamp}</p>
      )}
    </>
  );
};

export default RainMap;
