import React from 'react';
import { NavLink } from 'react-router-dom';

import LocationDropdown from '../components/LocationDropDown';

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <NavLink to="/history">
        <button className="history-btn" type="button">
          Lien vers l'historique
        </button>
      </NavLink>

      <div>
        <img
          src="https://www.kindpng.com/picc/m/331-3317031_simple-silhouette-world-map-hd-png-download.png"
          alt="worldmap"
        />
      </div>
    </>
  );
}
