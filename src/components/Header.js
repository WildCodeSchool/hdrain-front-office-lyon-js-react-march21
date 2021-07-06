import { NavLink, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import logo from '../assets/logo_HDRain.png';
import Authentification from './Authentication';

import API from '../APIClient';

export default function Header(auth = true) {
  const { addToast } = useToasts();
  const history = useHistory();

  const logout = () => {
    API.get('/auth/logout').then(() => {
      addToast('Successfully logged out', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/');
    });
  };

  return (
    <>
      <header>
        <div className="upper-header">
          <img className="nav-logo" src={logo} alt="HD RAIN" />

          <h1 className="site-title">HD Rain Monitoring Tool</h1>
        </div>
        <nav className="navBar">
          {auth && (
            <ul className="navList">
              <li className="navItem">
                <NavLink className="navLink" exact to="/home">
                  Home
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink className="navLink" exact to="/history">
                  History
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  className="navLink"
                  exact
                  to="/locations/neuralNetwork"
                >
                  Neural Network
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink className="navLink" exact to="/locations/assimilation">
                  Data Assimilation
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  className="navLink"
                  exact
                  to="/locations/virtualMachine"
                >
                  Virtual Machine
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  className="navLink"
                  exact
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Log out
                </NavLink>
              </li>
            </ul>
          )}
        </nav>
      </header>
      {!auth && <Authentification />}
    </>
  );
}
