import { motion } from 'framer-motion';
import { HiOutlineStar, HiOutlineTrash, HiOutlinePencil, HiOutlineExternalLink } from 'react-icons/hi';
import { RESOURCE_TYPES } from '../../utils/constants';
import { formatRelativeTime, truncate } from '../../utils/helpers';

export default function ResourceCard({ resource, onEdit, onDelete, onView, index = 0 }) {
  const typeInfo = RESOURCE_TYPES.find((t) => t.value === resource.type) || RESOURCE_TYPES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-surface-800 rounded-2xl p-5 shadow-card hover:shadow-card-hover ring-1 ring-surface-200 dark:ring-surface-700 transition-all cursor-pointer group"
      onClick={() => onView?.(resource)}
    >
      {/* Type badge + actions */}
      <div className="flex items-start justify-between mb-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${typeInfo.color}`}>
          <span>{typeInfo.icon}</span> {typeInfo.label}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); onEdit?.(resource); }} className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-400 hover:text-primary-500 cursor-pointer">
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete?.(resource.id); }} className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-surface-400 hover:text-rose-500 cursor-pointer">
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 mb-1.5 line-clamp-2">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-3 line-clamp-2">
        {truncate(resource.description, 120)}
      </p>

      {/* Tags */}
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 text-xs rounded-md">
              #{tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-xs text-surface-400">+{resource.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-surface-100 dark:border-surface-700">
        <span className="text-xs text-surface-400">{formatRelativeTime(resource.createdAt)}</span>
        <div className="flex items-center gap-1">
          <HiOutlineStar className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-medium text-surface-600 dark:text-surface-300">
            {resource.rating > 0 ? resource.rating.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
