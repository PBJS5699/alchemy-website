import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/todos');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Alchemy AI</Link>
      <button onClick={handleSignIn} className="sign-in-button">
        Sign Up
      </button>
    </nav>
  );
}

export default Navbar;