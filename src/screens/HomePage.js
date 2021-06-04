import React from 'react';
import { NavLink } from 'react-router-dom';
import DataAssimilationLink from '../components/DataAssimilationLink';
import Map from '../components/Map';
import LocationDropdown from '../components/LocationDropDown';
import NeuralNetworkLink from '../components/NeuralNetworkLink';

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <LocationDropdown />
      <NeuralNetworkLink />
      <br />
      <DataAssimilationLink />
      <br />
      <NavLink to="/history">Go to History Page</NavLink>
      <br />

      <Map />
    </>
  );
}
