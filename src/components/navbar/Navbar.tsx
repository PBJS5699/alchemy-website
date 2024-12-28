import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'aws-amplify/auth';
import { useState, useRef, useEffect } from 'react';
import logo from '../../assets/logo/logo.png';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { userName, refreshUserInfo } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      await refreshUserInfo();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAccountSettings = () => {
    navigate('/sign-in');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Alchemy AI" className="navbar-logo" />
      </Link>
      {userName ? (
        <div className="user-menu" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="user-button"
          >
            {userName}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleAccountSettings} className="dropdown-item">
                Account Settings
              </button>
              <button onClick={handleSignOut} className="dropdown-item">
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleSignIn} className="sign-in-button">
          Sign In
        </button>
      )}
    </nav>
  );
}

export default Navbar;