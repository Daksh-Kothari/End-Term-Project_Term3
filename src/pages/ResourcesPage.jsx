import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus } from 'react-icons/hi';
import { useResources } from '../hooks/useResources';
import ResourceGrid from '../components/resources/ResourceGrid';
import ResourceFilters from '../components/resources/ResourceFilters';
import ResourceForm from '../components/resources/ResourceForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import { toast } from 'react-toastify';

export default function ResourcesPage() {
  const { filteredResources, filters, addResource, updateResource, deleteResource, updateFilters } = useResources();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showDetail, setShowDetail] = useState(null);

  const handleAdd = useCallback((data) => {
    addResource(data);
    setShowForm(false);
    toast.success('Resource added! 📚');
  }, [addResource]);

  const handleEdit = useCallback((resource) => {
    setEditing(resource);
    setShowForm(true);
  }, []);

  const handleUpdate = useCallback((data) => {
    updateResource(editing.id, data);
    setEditing(null);
    setShowForm(false);
    toast.success('Resource updated!');
  }, [editing, updateResource]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Delete this resource?')) {
      deleteResource(id);
      toast.success('Resource deleted');
    }
  }, [deleteResource]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Resource Library</h1>
          <p className="text-surface-500 text-sm mt-1">{filteredResources.length} resources</p>
        </div>
        <Button icon={HiOutlinePlus} onClick={() => { setEditing(null); setShowForm(true); }}>
          Add Resource
        </Button>
      </motion.div>

      {/* Search */}
      <SearchBar
        value={filters.search}
        onChange={(val) => updateFilters({ search: val })}
        placeholder="Search by title, subject, tags..."
        className="sm:hidden"
      />

      {/* Filters */}
      <ResourceFilters
        filters={filters}
        onFilterChange={updateFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Grid */}
      <ResourceGrid
        resources={filteredResources}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={setShowDetail}
        viewMode={viewMode}
      />

      {/* Add/Edit Modal */}
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditing(null); }} title={editing ? 'Edit Resource' : 'Add New Resource'} size="lg">
        <ResourceForm resource={editing} onSubmit={editing ? handleUpdate : handleAdd} onCancel={() => { setShowForm(false); setEditing(null); }} />
      </Modal>

      {/* Detail Modal */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title={showDetail?.title} size="lg">
        {showDetail && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">{showDetail.type}</span>
              {showDetail.subject && <span className="px-3 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 text-xs rounded-full">{showDetail.subject}</span>}
            </div>
            {showDetail.description && <p className="text-sm text-surface-600 dark:text-surface-300">{showDetail.description}</p>}
            {showDetail.url && (
              <a href={showDetail.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline">
                Open Link ↗
              </a>
            )}
            {showDetail.content && (
              <div className="p-4 bg-surface-50 dark:bg-surface-900 rounded-xl text-sm text-surface-700 dark:text-surface-300 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {showDetail.content}
              </div>
            )}
            {showDetail.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {showDetail.tags.map((t) => <span key={t} className="px-2 py-1 bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 text-xs rounded-lg">#{t}</span>)}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
