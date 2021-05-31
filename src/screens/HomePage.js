import React from 'react';
import { NavLink } from 'react-router-dom';

import LocationDropdown from '../components/LocationDropDown';

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>Home</h1>
        <LocationDropdown />
        {/*
        <h3>Détails du site choisi</h3>
        <button className="generic-btn" type="button">
          Réseau de Neurones
        </button>
        <button className="generic-btn" type="button">
          Assimilation
        </button>
*/}
        <NavLink to="/history">
          <button className="history-btn" type="button">
            Lien vers l'historique
          </button>
        </NavLink>
      </div>
      <div>
        <img
          src="https://www.kindpng.com/picc/m/331-3317031_simple-silhouette-world-map-hd-png-download.png"
          alt="worldmap"
        />
      </div>
    </div>
  );
}
