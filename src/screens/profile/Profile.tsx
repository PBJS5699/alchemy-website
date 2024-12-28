import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

interface UserAttributes {
  'custom:display_name'?: string;
  'custom:affiliation'?: string;
  email?: string;
}

function Profile() {
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();
  const { refreshUserInfo } = useAuth();

  useEffect(() => {
    async function fetchAttributes() {
      try {
        setIsLoading(true);
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
      } catch (error) {
        // If we can't fetch attributes, user is not logged in
        navigate('/sign-in');
      } finally {
        setIsLoading(false);
      }
    }

    fetchAttributes();
  }, [navigate]);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple sign-out attempts
    
    try {
      setIsSigningOut(true);
      await signOut({ global: true }); // Sign out from all devices
      await refreshUserInfo(); // Update auth context
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">Loading user data...</div>
      </div>
    );
  }

  if (!userAttributes) {
    return null;
  }

  return (
    <main className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profile</h1>
          <button 
            onClick={handleSignOut} 
            className="sign-out-button"
            disabled={isSigningOut}
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
        <div className="user-info">
          <h2>Hello, {userAttributes['custom:display_name']}</h2>
          <div className="user-details">
            <p><strong>Email:</strong> {userAttributes.email}</p>
            <p><strong>Affiliation:</strong> {userAttributes['custom:affiliation']}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile; 