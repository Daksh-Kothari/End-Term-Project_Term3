import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineUser,
  HiX,
} from 'react-icons/hi';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/resources', label: 'Resources', icon: HiOutlineBookOpen },
  { path: '/quiz', label: 'AI Quiz', icon: HiOutlineLightBulb },
  { path: '/groups', label: 'Study Groups', icon: HiOutlineUserGroup },
  { path: '/planner', label: 'Planner', icon: HiOutlineCalendar },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-surface-900 dark:text-white">
              {APP_NAME}
            </h1>
            <p className="text-[10px] text-surface-400 uppercase tracking-widest">
              Smart Study Hub
            </p>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer"
        >
          <HiX className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 shadow-sm'
                  : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-surface-400 group-hover:text-surface-600 dark:group-hover:text-surface-300'
                  }`}
                />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="p-4 border-t border-surface-200 dark:border-surface-700">
        <NavLink
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors mb-2"
        >
          <div className="w-9 h-9 rounded-full gradient-bg-accent flex items-center justify-center">
            <HiOutlineUser className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-surface-400 truncate">
              {user?.email}
            </p>
          </div>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-surface-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 transition-colors cursor-pointer"
        >
          <HiOutlineLogout className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 z-50 shadow-2xl"
          >
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
