import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo/logo.png';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { userName } = useAuth();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Alchemy AI" className="navbar-logo" />
      </Link>
      {userName ? (
        <button onClick={handleSignIn} className="user-button">
          {userName}
        </button>
      ) : (
        <button onClick={handleSignIn} className="sign-in-button">
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Navbar;