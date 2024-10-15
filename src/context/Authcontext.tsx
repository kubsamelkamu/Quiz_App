import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {  onAuthStateChanged, User } from 'firebase/auth'; 
import { auth } from '../firebase';


interface AuthContextProps {
  currentUser: User | null; 
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>
                {children}
        </AuthContext.Provider>;
};
