import { getInitials } from '../../utils/helpers';

export default function MemberList({ members = [] }) {
  const colors = ['bg-primary-500', 'bg-pink-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500'];
  return (
    <div className="flex -space-x-2">
      {members.slice(0, 5).map((m, i) => (
        <div key={i} className={`w-8 h-8 rounded-full ${colors[i % colors.length]} flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white dark:ring-surface-800`}>
          {getInitials(m)}
        </div>
      ))}
      {members.length > 5 && (
        <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-xs font-medium text-surface-600 dark:text-surface-300 ring-2 ring-white dark:ring-surface-800">
          +{members.length - 5}
        </div>
      )}
    </div>
  );
}
