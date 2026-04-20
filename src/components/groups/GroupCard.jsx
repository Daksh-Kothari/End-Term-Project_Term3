import { motion } from 'framer-motion';
import { HiOutlineUserGroup, HiOutlineClipboard } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function GroupCard({ group, onClick, index = 0 }) {
  const copyCode = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(group.inviteCode);
    toast.success('Invite code copied!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(group)}
      className="bg-white dark:bg-surface-800 rounded-2xl p-5 shadow-card hover:shadow-card-hover ring-1 ring-surface-200 dark:ring-surface-700 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl gradient-bg-accent flex items-center justify-center flex-shrink-0">
          <HiOutlineUserGroup className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 truncate">{group.name}</h3>
          <p className="text-sm text-surface-500 dark:text-surface-400 line-clamp-2 mt-1">{group.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-surface-400">
              <span className="font-medium text-surface-600 dark:text-surface-300">{group.memberCount}</span> members
            </span>
            <span className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-700 text-surface-500 rounded-md">
              {group.subject}
            </span>
            <button onClick={copyCode} className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 cursor-pointer ml-auto">
              <HiOutlineClipboard className="w-3.5 h-3.5" />
              {group.inviteCode}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
