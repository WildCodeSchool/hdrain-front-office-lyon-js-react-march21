export default function AssimilationInfos({ assimilationParams }) {
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

      <img src="../assets/graph-exemple.png" alt="graph" />
      <img src="../assets/rainmap-exemple.png" alt="graph" />
    </>
  );
}
