import { useContext } from 'react';
import { LocationContext } from '../contexts/LocationContext';

const CostGraph = () => {
  const { experiment, locationName } = useContext(LocationContext);
  return (
    <>
      <h3>Cost Graph {locationName}</h3>
      {experiment?.costGraph ? (
        <img
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
