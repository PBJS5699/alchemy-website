import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './SignIn.css';

function SignIn() {
  return (
    <main className="sign-in-container">
      <Authenticator>
        {({ signOut }) => (
          <div className="signed-in-content">
            <h2>Welcome to Alchemy AI</h2>
            <button onClick={signOut} className="sign-out-button">Sign out</button>
          </div>
        )}
      </Authenticator>
    </main>
  );
}

export default SignIn; 