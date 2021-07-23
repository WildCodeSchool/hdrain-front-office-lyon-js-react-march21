import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const CostGraph = ({ width = 700, height = 530 }) => {
  const { experiment, locationName } = useContext(LocationContext);
  return (
    <>
      <h3>Cost Graph {locationName}</h3>
      {experiment?.costGraph ? (
        <img
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="costGraph"
          src={experiment?.costGraph}
          alt="costGraph"
        />
      ) : (
        <p>No cost graph available for {experiment?.timestamp}</p>
      )}
    </>
  );
};

export default CostGraph;
