import { createUserWithEmailAndPassword, sendEmailVerification ,signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export const signup = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);

  return userCredential.user;
};

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!user.emailVerified) {
    throw new Error('Verify your email address'); 
  }

  return user;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider(); 

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('auth/google-sign-in-failed'); 
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return 'Password reset email sent!';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Failed to send password reset email. Please try again.');
  }
};
