import ResourceCard from './ResourceCard';
import EmptyState from '../ui/EmptyState';
import { HiOutlineBookOpen } from 'react-icons/hi';

export default function ResourceGrid({ resources, onEdit, onDelete, onView, viewMode = 'grid' }) {
  if (!resources || resources.length === 0) {
    return (
      <EmptyState
        icon={HiOutlineBookOpen}
        title="No resources found"
        description="Add your first study resource or adjust your filters."
      />
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {resources.map((r, i) => (
          <ResourceCard key={r.id} resource={r} onEdit={onEdit} onDelete={onDelete} onView={onView} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {resources.map((r, i) => (
        <ResourceCard key={r.id} resource={r} onEdit={onEdit} onDelete={onDelete} onView={onView} index={i} />
      ))}
    </div>
  );
}
