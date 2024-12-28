import { Authenticator, ThemeProvider, useTheme } from '@aws-amplify/ui-react';
import { AuthUser } from '@aws-amplify/auth';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import './SignIn.css';
import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

// Add interface for user attributes
interface UserAttributes {
  'custom:display_name'?: string;
  'custom:affiliation'?: string;
  email?: string;
  sub: string;
}

interface AmplifyUser extends AuthUser {
  attributes?: UserAttributes;
}

// List of US colleges (this is a subset, you might want to use a complete list)
const US_COLLEGES = [
  "Massachusetts Institute of Technology",
  "Harvard University",
  "Stanford University",
  "California Institute of Technology",
  "Princeton University",
  "Yale University",
  "Columbia University",
  "University of California, Berkeley",
  "University of Michigan",
  "Cornell University",
  "University of Washington",
  "Carnegie Mellon University",
  "Johns Hopkins University",
  "University of Illinois at Urbana-Champaign",
  "Georgia Institute of Technology",
  "University of Texas at Austin",
].sort();

interface PasswordRequirementProps {
  isMet: boolean;
  text: string;
}

const PasswordRequirement = ({ isMet, text }: PasswordRequirementProps) => (
  <div className={`password-requirement ${isMet ? 'met' : 'unmet'}`}>
    <span className="requirement-icon">{isMet ? '✓' : '○'}</span>
    <span className="requirement-text">{text}</span>
  </div>
);

interface AffiliationFieldProps {
  label: string;
  onChange: (value: string) => void;
}

const AffiliationField = ({ label, onChange }: AffiliationFieldProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredColleges = useMemo(() => {
    return US_COLLEGES.filter(college =>
      college.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="custom-select-container">
      <label>{label}</label>
      <div className="dropdown-container">
        <input
          type="text"
          placeholder="Search for your institution..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="college-search-input"
        />
        {isOpen && (
          <div className="college-dropdown">
            {filteredColleges.map((college) => (
              <div
                key={college}
                className="college-option"
                onClick={() => {
                  onChange(college);
                  setSearchTerm(college);
                  setIsOpen(false);
                }}
              >
                {college}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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

const components = {
  SignUp: {
    FormFields() {
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');

      const requirements = {
        length: password.length >= 8,
        number: /\d/.test(password),
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        special: /[!@#$%^&*(),._?":{}|<>]/.test(password),
        match: password === confirmPassword && password.length > 0,
      };

      return (
        <div className="signup-form">
          <div className="form-field">
            <label>Display Name</label>
            <input 
              name="custom:display_name"
              type="text"
              placeholder="Enter your full name" 
              required 
              className="form-input"
            />
          </div>
          <div style={{ display: 'none' }}>
            <input name="custom:affiliation" />
          </div>
          <AffiliationField
            label="University/Lab Affiliation"
            onChange={(value) => {
              const input = document.querySelector('input[name="custom:affiliation"]');
              if (input) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                  window.HTMLInputElement.prototype,
                  "value"
                )?.set;
                if (nativeInputValueSetter) {
                  nativeInputValueSetter.call(input, value);
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }
            }}
          />
          <div className="form-field">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create a password" 
              required 
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="form-field">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirm_password" 
              placeholder="Confirm password" 
              required 
              className="form-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="password-requirements">
            <h4>Password Requirements:</h4>
            <PasswordRequirement isMet={requirements.length} text="At least 8 characters long" />
            <PasswordRequirement isMet={requirements.uppercase} text="Contains uppercase letter" />
            <PasswordRequirement isMet={requirements.lowercase} text="Contains lowercase letter" />
            <PasswordRequirement isMet={requirements.number} text="Contains number" />
            <PasswordRequirement isMet={requirements.special} text="Contains special character" />
            <PasswordRequirement isMet={requirements.match} text="Passwords match" />
          </div>
        </div>
      );
    },
  },
};

const formFields = {
  signUp: {
    'custom:display_name': {
      label: 'Display Name',
      placeholder: 'Enter your full name',
      order: 1,
      isRequired: true,
      type: 'string',
    },
    'custom:affiliation': {
      order: 2,
      isRequired: true,
      type: 'string',
    },
    email: {
      order: 3,
    },
    password: {
      order: 4,
    },
    confirm_password: {
      order: 5,
    },
  },
};

function SignIn() {
  const [userAttributes, setUserAttributes] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshUserInfo } = useAuth();

  useEffect(() => {
    async function fetchAttributes() {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        console.log('Current user:', currentUser);
        console.log('Fetched attributes:', attributes);
        setUserAttributes(attributes);
        await refreshUserInfo(); // Refresh the global auth state
      } catch (error) {
        console.error('Error fetching user attributes:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAttributes();
  }, [refreshUserInfo]);

  return (
    <main className="sign-in-container">
      <div className="auth-wrapper">
        <h1 className="welcome-text">Welcome to Alchemy</h1>
        <ThemeProvider theme={theme}>
          <Authenticator 
            formFields={formFields}
            components={components}
          >
            {({ signOut }) => {
              const displayName = userAttributes?.['custom:display_name'] || '';
              const affiliation = userAttributes?.['custom:affiliation'] || '';
              const email = userAttributes?.email || '';

              if (isLoading) {
                return (
                  <div className="signed-in-content">
                    <div className="loading-spinner">Loading user data...</div>
                  </div>
                );
              }

              return (
                <div className="signed-in-content">
                  <div className="user-info">
                    <h2>Hello, {displayName}</h2>
                    <div className="user-details">
                      <p><strong>Email:</strong> {email}</p>
                      <p><strong>Affiliation:</strong> {affiliation}</p>
                    </div>
                  </div>
                  <button onClick={signOut} className="sign-out-button">
                    Sign out
                  </button>
                </div>
              );
            }}
          </Authenticator>
        </ThemeProvider>
      </div>
    </main>
  );
}

export default SignIn; 