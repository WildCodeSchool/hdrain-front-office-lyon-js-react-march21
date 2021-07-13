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
          <NavLink className="navLink" exact to="/neuralNetwork">
            Neural Network
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink className="navLink" exact to="/assimilation">
            Data Assimilation
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink className="navLink" exact to="/logIn">
            Log In
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
