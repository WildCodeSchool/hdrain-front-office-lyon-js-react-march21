import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const RainMap = ({ size = 400, borderColor = '' }) => {
  const { experiment, locationName } = useContext(LocationContext);
  return (
    <>
      <h3>Rain Map {locationName}</h3>
      {experiment?.rainMap ? (
        <img
          style={{
            width: `${size}px`,
            height: `${size}px`,
            border: borderColor ? `5px solid ${borderColor}` : 'none',
          }}
          className="rainMap"
          src={experiment?.rainMap}
          alt="rainMap"
        />
      ) : (
        <p>No rain map available for {experiment.timestamp}</p>
      )}
    </>
  );
};

export default RainMap;
