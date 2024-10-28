import { useState } from 'react';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app'; 
import { login, signInWithGoogle } from '@/auth';
import { getFriendlyErrorMessage } from '@/utils/errormessage';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      router.push({
        pathname: '/dashboard',
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        const errorMessage = getFriendlyErrorMessage(err.code); 
        setError(errorMessage);
      } else if (err instanceof Error) {
        setError(err.message); 
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };
  const handleGoogleSignIn = async () => {
    setError(''); 
    try {
      await signInWithGoogle();
      router.push({
        pathname: '/dashboard',
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition duration-200"
        >
          Sign in with Google
        </button>
        <p className="mt-4 text-gray-600">
          Forgot your password?{' '}
          <Link href="/reset" className="text-blue-500 hover:underline">
            Reset
          </Link> 
        </p>
        <p className="mt-4 text-gray-600">
          Do not have account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link> 
        </p>
      </div>
    </div>
  );
};

export default Login;










