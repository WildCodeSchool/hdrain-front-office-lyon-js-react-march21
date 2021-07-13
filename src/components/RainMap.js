import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const RainMap = ({ size = 400, borderColor = '' }) => {
  const { experiment } = useContext(LocationContext);
  return (
    <>
      <h3>Rain Map</h3>
      <img
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: borderColor ? `5px solid ${borderColor}` : 'none',
        }}
        className="rainMap"
        src={
          experiment?.rainGraph ||
          'https://via.placeholder.com/600x400?text=Rain Graph'
        }
        alt="rainMap"
      />
    </>
  );
};

export default RainMap;
