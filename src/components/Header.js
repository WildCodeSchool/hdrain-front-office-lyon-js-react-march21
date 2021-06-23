import MenuNav from './MenuNav';
import logo from '../assets/logo_HDRain.png';

export default function Header() {
  return (
    <header>
      <div className="upper-header">
        <img className="nav-logo" src={logo} alt="HD RAIN" />

        <h1 className="site-title">HD Rain Monitoring Tool</h1>
      </div>
      <MenuNav />
    </header>
  );
}
