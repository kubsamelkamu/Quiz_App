import { useState } from 'react';
import { login, signInWithGoogle } from '../../auth'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password); 
      alert('Login successful!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to login');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(); 
      alert('Google Sign-In successful!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
