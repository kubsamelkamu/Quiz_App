export const getFriendlyErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is not valid. Please check and try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check or sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please log in instead.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later.';
    case 'auth/unverified-email':
      return 'Your email is not verified. Please verify your email before logging in.'; 
    case 'auth/invalid-credential':
      return 'The provided credentials are invalid. Please try again or use another method.';
    default:
      return `An unknown error occurred: ${errorCode}. Please try again.`;
  }
};
