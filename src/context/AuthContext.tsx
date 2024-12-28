import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';

interface AuthContextType {
  userName: string | null;
  refreshUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string | null>(null);

  const refreshUserInfo = async () => {
    try {
      const attributes = await fetchUserAttributes();
      setUserName(attributes['custom:display_name'] || null);
    } catch (error) {
      setUserName(null);
    }
  };

  useEffect(() => {
    refreshUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ userName, refreshUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 