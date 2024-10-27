import { ReactNode } from 'react';
import TopNavBar from './topNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-grow container mx-auto px-4 py-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
