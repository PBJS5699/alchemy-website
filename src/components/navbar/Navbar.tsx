import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Alchemy AI" className="navbar-logo" />
      </Link>
      <button onClick={handleSignIn} className="sign-in-button">
        Sign In
      </button>
    </nav>
  );
}

export default Navbar;