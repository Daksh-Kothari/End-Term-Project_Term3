import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

/**
 * Main app layout with sidebar, header, and content area
 */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main content area — offset by sidebar width on desktop */}
      <div className="flex flex-col min-h-screen">
        <Header onMenuClick={openSidebar} />

        <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
