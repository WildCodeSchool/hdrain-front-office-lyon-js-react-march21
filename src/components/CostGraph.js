import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const CostGraph = ({ size = 500, borderColor = '' }) => {
  const { experiment, locationName } = useContext(LocationContext);
  return (
    <>
      <h3>Cost Graph {locationName}</h3>
      <img
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: borderColor ? `5px solid ${borderColor}` : 'none',
        }}
        className="CostGraph"
        src={
          experiment?.costGraph ||
          'https://via.placeholder.com/600x400?text=Cost Graph'
        }
        alt="costGraph"
      />
    </>
  );
};

export default CostGraph;
