import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'aws-amplify/auth';
import { useState, useRef, useEffect, useMemo } from 'react';
import logo from '../../assets/logo/logo.png';
import appleLogo from '../../assets/os-icons/apple-logo.png';
import windowsLogo from '../../assets/os-icons/windows-logo.png';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { userName, refreshUserInfo } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userOS = useMemo(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
    return 'other';
  }, []);

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple sign-out attempts
    
    try {
      setIsSigningOut(true);
      await signOut({ global: true }); // Sign out from all devices
      await refreshUserInfo(); // Update auth context
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleAccountSettings = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
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
      <div className="nav-buttons">
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
                <button 
                  onClick={handleSignOut} 
                  className="dropdown-item"
                  disabled={isSigningOut}
                >
                  {isSigningOut ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleSignIn} className="sign-in-button">
            Sign In
          </button>
        )}
        <button className="download-button">
          <img 
            src={userOS === 'mac' ? appleLogo : windowsLogo} 
            alt={userOS === 'mac' ? "Apple logo" : "Windows logo"} 
            className="os-icon"
          />
          Download
        </button>
      </div>
    </nav>
  );
}

export default Navbar;