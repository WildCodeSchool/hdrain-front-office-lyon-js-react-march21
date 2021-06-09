import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocationContext } from '../contexts/LocationContext';

export default function DataAssimilationLink() {
  const { selectedLocation } = useContext(LocationContext);

  return (
    <>
      <Link
        to="/monitoring/assimilation"
        style={
          selectedLocation === 'None' ||
          selectedLocation === 'More locations coming soon...'
            ? { pointerEvents: 'none' }
            : null
        }
      >
        Go to Data Assimilation Page
      </Link>
    </>
  );
}
