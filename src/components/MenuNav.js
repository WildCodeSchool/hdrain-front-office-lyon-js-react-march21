import { NavLink, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import API from '../APIClient';

export default function MenuNav({ auth = true }) {
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
              }}
            >
              Log out
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
