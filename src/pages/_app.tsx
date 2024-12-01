import { AuthProvider } from '@/context/Authcontext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import InstallPrompt from '@/components/InstallPrompt';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <InstallPrompt />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
