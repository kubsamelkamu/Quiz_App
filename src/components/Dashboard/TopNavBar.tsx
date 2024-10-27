import { useState } from 'react';
import { useAuth } from '@/context/Authcontext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi'; 

const TopNavBar = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/dashboard">
            Quiz Dashboard
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="" className="hover:underline">
                Quiz History
          </Link>
          <Link href="/" className="hover:underline">
             Progress
          </Link>
          <Link href='' className="hover:underline">
                Leaderboard
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-800 font-semibold">
                {currentUser.displayName?.charAt(0) || 'U'}
              </span>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login"className="hover:underline">
                Login
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

   
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 space-y-4">
          <Link href="/dashboard/profile"onClick={toggleMenu} className="block text-white hover:underline">
                 Profile
          </Link>
          <Link href="/dashboard/history"onClick={toggleMenu} className="block text-white hover:underline">
                Quiz History
          </Link>
          <Link href="/dashboard/progress"onClick={toggleMenu} className="block text-white hover:underline">
             Progress
          </Link>
          <Link href="/dashboard/leaderboard"onClick={toggleMenu} className="block text-white hover:underline">
            Leaderboard
          </Link>
          {currentUser ? (
            <button onClick={() => { handleLogout(); toggleMenu(); }} className="block text-white hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={toggleMenu} className="block text-white hover:underline">
                Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;
