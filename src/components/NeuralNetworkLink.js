import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';

function NeuralNetworkLink() {
  const { selectedLocation } = useContext(LocationContext);

  return (
    <>
      <Link
        to="/monitoring/neuralNetwork"
        style={selectedLocation === 'None' ? { pointerEvents: 'none' } : null}
      >
        Go to Neural Network Page
      </Link>
    </>
  );
}

export default NeuralNetworkLink;
