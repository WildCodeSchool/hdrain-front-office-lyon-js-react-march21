import React from 'react';
import { NavLink } from 'react-router-dom';

import TestDropDown from '../components/Testdropdown';

const items = [
  {
    id: 1,
    value: 'Abidjan',
  },

  { id: 2, value: 'Antibes' },

  { id: 3, value: 'Toulouse' },
];

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>Home</h1>
        <div>Choix du Site</div>
        <TestDropDown title="Select location" items={items} />

        <h3>Détails du site choisi</h3>
        <button className="generic-btn" type="button">
          Réseau de Neurones
        </button>
        <button className="generic-btn" type="button">
          Assimilation
        </button>
        <NavLink to="/history">
          <button type="button">Lien vers l'historique</button>
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
