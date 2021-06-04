/* eslint-disable no-unused-vars */
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
    </>
  );
}
