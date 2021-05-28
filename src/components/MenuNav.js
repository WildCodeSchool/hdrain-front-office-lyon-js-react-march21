import { NavLink } from 'react-router-dom';

export default function MenuNav() {
  return (
    <nav className="navBar">
      <ul className="navList">
        <li className="navItem">
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink exact to="/monitoring">
            Monitoring
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink exact to="/history">
            History
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink exact to="/monitoring/neuralNetwork">
            Neural Network
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink exact to="/monitoring/virtualMachine">
            Virtual Engine
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
