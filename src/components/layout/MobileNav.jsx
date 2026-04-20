import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineChartBar,
} from 'react-icons/hi';

const mobileNavItems = [
  { path: '/dashboard', label: 'Home', icon: HiOutlineHome },
  { path: '/resources', label: 'Library', icon: HiOutlineBookOpen },
  { path: '/quiz', label: 'Quiz', icon: HiOutlineLightBulb },
  { path: '/groups', label: 'Groups', icon: HiOutlineUserGroup },
  { path: '/analytics', label: 'Stats', icon: HiOutlineChartBar },
];

/**
 * Mobile bottom navigation bar (visible only on small screens)
 */
export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-t border-surface-200 dark:border-surface-800 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-0 w-8 h-0.5 rounded-full bg-primary-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
