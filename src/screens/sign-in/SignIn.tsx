import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './SignIn.css';

const theme = {
  name: 'custom-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          10: '#f5f8fc',
          20: '#e6f0f9',
          40: '#cce1f3',
          60: '#99c2e8',
          80: '#66a4dc',
          90: '#3385d1',
          100: '#006acc',  // Your primary blue
        },
      },
    },
    components: {
      tabs: {
        item: {
          _active: {
            color: '#006acc',
            borderColor: '#006acc',
          },
          _hover: {
            color: '#0055b3',
          },
        },
      },
      button: {
        primary: {
          backgroundColor: '#006acc',
          _hover: {
            backgroundColor: '#0055b3',
          },
        },
        link: {
          _hover: {
            color: '#0055b3',
          },
          color: '#006acc',
        },
      },
      fieldcontrol: {
        _focus: {
          borderColor: '#006acc',
        },
      },
    },
  },
};

function SignIn() {
  return (
    <main className="sign-in-container">
      <div className="auth-wrapper">
        <h1 className="welcome-text">Welcome to Alchemy</h1>
        <ThemeProvider theme={theme}>
          <Authenticator>
            {({ signOut }) => (
              <div className="signed-in-content">
                <h2>Welcome to Alchemy AI</h2>
                <button onClick={signOut} className="sign-out-button">Sign out</button>
              </div>
            )}
          </Authenticator>
        </ThemeProvider>
      </div>
    </main>
  );
}

export default SignIn; 