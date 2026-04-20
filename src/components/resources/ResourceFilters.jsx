import { RESOURCE_TYPES, SUBJECTS } from '../../utils/constants';
import { HiOutlineViewGrid, HiOutlineViewList, HiOutlineFilter } from 'react-icons/hi';

export default function ResourceFilters({ filters, onFilterChange, viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) => onFilterChange({ type: e.target.value })}
        className="px-3 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
      >
        <option value="">All Types</option>
        {RESOURCE_TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
        ))}
      </select>

      {/* Subject filter */}
      <select
        value={filters.subject}
        onChange={(e) => onFilterChange({ subject: e.target.value })}
        className="px-3 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
      >
        <option value="">All Subjects</option>
        {SUBJECTS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={(e) => {
          const [sortBy, sortOrder] = e.target.value.split('-');
          onFilterChange({ sortBy, sortOrder });
        }}
        className="px-3 py-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-700 dark:text-surface-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
      >
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
        <option value="title-asc">Name A–Z</option>
        <option value="title-desc">Name Z–A</option>
        <option value="rating-desc">Highest Rated</option>
      </select>

      {/* View mode toggle */}
      <div className="flex items-center gap-1 ml-auto bg-surface-100 dark:bg-surface-800 rounded-xl p-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white dark:bg-surface-700 shadow-sm text-primary-600' : 'text-surface-400 hover:text-surface-600'}`}
        >
          <HiOutlineViewGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-surface-700 shadow-sm text-primary-600' : 'text-surface-400 hover:text-surface-600'}`}
        >
          <HiOutlineViewList className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
