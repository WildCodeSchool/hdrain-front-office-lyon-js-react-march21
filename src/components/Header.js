import MenuNav from './MenuNav';
import logo from '../assets/logo_HDRain.png';

export default function Header() {
  return (
    <header>
      <img className="nav-logo" src={logo} alt="HD RAIN" />
      <h2 className="site-title">HD Rain Monitoring Tool</h2>
      <MenuNav />
    </header>
  );
}
