/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); 
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {

      (deferredPrompt as any).prompt();
      const choiceResult = await (deferredPrompt as any).userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      setDeferredPrompt(null); 
      setShowPrompt(false);   
    }
  };

  return (
    <>
      {showPrompt && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
          <p className="text-sm">Install this app for a better experience!</p>
          <button
            onClick={handleInstallClick}
            className="bg-white text-indigo-600 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Install
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="text-gray-300 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default InstallPrompt;
