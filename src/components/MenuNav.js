import { NavLink } from 'react-router-dom';

export default function MenuNav() {
  return (
    <nav className="navBar">
      <ul className="navList">
        <li className="navItem">
          <NavLink className="navLink" exact to="/">
            Home
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink className="navLink" exact to="/history">
            History
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink className="navLink" exact to="/monitoring/neuralNetwork">
            Neural Network
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink className="navLink" exact to="/monitoring/assimilation">
            Data Assimilation
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink className="navLink" exact to="/monitoring/virtualMachine">
            Virtual Machine
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink exact to="/logIn">
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
