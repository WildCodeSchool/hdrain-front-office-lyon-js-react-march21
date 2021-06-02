/* eslint-disable no-unused-vars */
import rainMMap from '../assets/rainmap.png';
import Map from './Map';

export default function AssimilationInfos({ assimilationParams, show }) {
  return (
    <>
      {assimilationParams.map((params) => (
        <ul>
          <li>location: {params.location}</li>
          <li>NX: {params.NX}</li>
          <li>NY: {params.NY}</li>
          <li>theta: {params.theta}</li>
        </ul>
      ))}
      {/* {!show && (
        <div className="maps">
          <h3>Sensor map</h3>
          <Map />
          <h3>Rain map</h3>
          <img src={rainMMap} alt="rainMap" />
        </div>
      )} */}
    </>
  );
}
