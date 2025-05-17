import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: () => {},
  isAuthenticated: false,
});

// Hook for using auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkSession();
  }, []);
  
  // Sign in function - replace with your actual auth logic
  const signIn = async (email: string, password: string) => {
    try {
      // This is a dummy authentication - replace with your actual auth API
      if (email && password) {
        // Simulate successful login
        const mockUser = {
          id: '1',
          email,
          name: 'Library Admin',
          role: 'admin' as const,
        };
        
        // Store user in localStorage (for demo purposes)
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  // Sign out function
  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        signIn, 
        signOut,
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};