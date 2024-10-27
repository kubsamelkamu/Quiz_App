import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
