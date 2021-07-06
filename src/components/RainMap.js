import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const RainMap = ({ rainGraph, size = 200, borderColor = '' }) => {
  const { experiment } = useContext(LocationContext);
  console.log(rainGraph);
  return (
    <img
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: borderColor ? `5px solid ${borderColor}` : 'none',
      }}
      className="rainMap"
      src={
        experiment?.rainGraph ||
        'https://via.placeholder.com/300/300/?Text=RainMap'
      }
      alt="rainMap"
    />
  );
};

export default RainMap;
