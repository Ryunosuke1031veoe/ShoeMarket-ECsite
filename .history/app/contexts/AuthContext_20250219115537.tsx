// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface User {
//   id: string;
//   username: string;
//   email: string;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: User | null;
//   signIn: (user: User) => void;
//   signOut: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(() => {
//     const storedUser = sessionStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   const signIn = (userData: User) => {
//     setUser(userData);
//     sessionStorage.setItem('user', JSON.stringify(userData));
//   };

//   const signOut = () => {
//     setUser(null);
//     sessionStorage.removeItem('user');
//   };

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          return null;
        }
      }
    }
    return null;
  });

  const signIn = (userData: User) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const signOut = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('user');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        signIn, 
        signOut 
      }}
    >
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