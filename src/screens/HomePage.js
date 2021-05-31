import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>Home</h1>
        <div>Choix du Site</div>
        <h3>Détails du site choisi</h3>
        <ul>
          <li>Abidjan</li>
          <li>Antibes</li>
          <li>Toulouse</li>
        </ul>
        <button type="button">Réseau de Neurones</button>
        <button type="button">Assimilation</button>
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
