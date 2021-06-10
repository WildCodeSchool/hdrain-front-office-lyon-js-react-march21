import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';

export default function NeuralNetworkLink() {
  const { selectedLocation } = useContext(LocationContext);

  return (
    <>
      <Link
        to="/locations/neuralNetwork"
        style={
          selectedLocation === 'None' ||
          selectedLocation === 'More locations coming soon...'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Neural Network Page
      </Link>
    </>
  );
}
