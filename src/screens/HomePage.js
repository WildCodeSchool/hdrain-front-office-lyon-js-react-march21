import React from 'react';
import { NavLink } from 'react-router-dom';

import LocationDropdown from '../components/LocationDropDown';
import NeuralNetworkLink from '../components/NeuralNetworkLink';

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <NeuralNetworkLink />
      <br />
      <NavLink to="/history">History Link</NavLink>
      <br />
      <div>
        <img
          src="https://www.kindpng.com/picc/m/331-3317031_simple-silhouette-world-map-hd-png-download.png"
          alt="worldmap"
        />
      </div>
    </>
  );
}
