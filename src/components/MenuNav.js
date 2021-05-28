import { NavLink } from 'react-router-dom';

export default function MenuNav() {
  return (
    <div>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/monitoring">
        Monitoring
      </NavLink>
      <NavLink exact to="/history">
        History
      </NavLink>
      <NavLink exact to="/monitoring/neuralNetwork">
        Neurons Network
      </NavLink>
      <NavLink exact to="/monitoring/virtualMachine">
        Virtual Engine
      </NavLink>
    </div>
  );
}
