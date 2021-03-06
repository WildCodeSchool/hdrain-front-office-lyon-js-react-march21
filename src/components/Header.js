import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import logo from '../assets/logo_HDRain.png';
import LoginForm from './LoginForm';
import CurrentUser from '../contexts/currentUserContext';

import API from '../APIClient';

export default function Header() {
  const { addToast } = useToasts();
  const history = useHistory();

  const [auth, setAuth] = useState(false);

  useEffect(async () => {
    try {
      const res = await API.get('/currentUser');
      if (!res.data.username) setAuth(false);
      else setAuth(true);
    } catch (err) {
      window.console.error('Connection failed ', err);
    }
  }, []);

  const logout = async () => {
    API.get('/auth/logout').then(() => {
      addToast('Successfully logged out', {
        appearance: 'success',
        autoDismiss: true,
      });
      history.push('/');
    });
  };

  return (
    <CurrentUser.Provider value={auth}>
      <header>
        <div className="upper-header">
          <img className="nav-logo" src={logo} alt="HD RAIN" />
          <h1 className="site-title">HD Rain Monitoring Tool</h1>
        </div>
        {auth ? (
          <nav className="navBar">
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
                <NavLink
                  className="navLink"
                  exact
                  to="/"
                  onClick={() => {
                    logout();
                    setAuth(false);
                  }}
                >
                  Log out
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
      {auth ? null : <LoginForm />}
    </CurrentUser.Provider>
  );
}
