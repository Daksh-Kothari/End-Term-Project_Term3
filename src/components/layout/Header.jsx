import { HiOutlineMenuAlt2, HiOutlineBell } from 'react-icons/hi';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';
import { useState } from 'react';
import { useResources } from '../../hooks/useResources';
import { useDebounce } from '../../hooks/useDebounce';

export default function Header({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { updateFilters } = useResources();
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Update resource filters when debounced search changes
  if (debouncedSearch !== undefined) {
    // This is handled by the ResourcesPage directly
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
          >
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </button>

          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              updateFilters({ search: val });
            }}
            placeholder="Search resources, subjects..."
            className="hidden sm:block w-full max-w-md"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 transition-colors cursor-pointer">
            <HiOutlineBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
