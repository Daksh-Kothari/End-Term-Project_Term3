import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { RESOURCE_TYPES, SUBJECTS } from '../../utils/constants';
import { HiOutlineSave, HiX } from 'react-icons/hi';

export default function ResourceForm({ resource, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '', description: '', type: 'note', url: '', content: '', subject: '', topic: '', tags: '',
  });

  useEffect(() => {
    if (resource) {
      setForm({
        title: resource.title || '',
        description: resource.description || '',
        type: resource.type || 'note',
        url: resource.url || '',
        content: resource.content || '',
        subject: resource.subject || '',
        topic: resource.topic || '',
        tags: resource.tags?.join(', ') || '',
      });
    }
  }, [resource]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    });
  };

  const inputCls = 'w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all';

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Resource title" className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
            {RESOURCE_TYPES.map((t) => <option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Subject</label>
          <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
            <option value="">Select subject</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Brief description..." className={inputCls} />
      </div>

      {(form.type === 'link' || form.type === 'video' || form.type === 'pdf' || form.type === 'article') && (
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">URL</label>
          <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." className={inputCls} />
        </div>
      )}

      {form.type === 'note' && (
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Content</label>
          <textarea name="content" value={form.content} onChange={handleChange} rows={6} placeholder="Write your notes here..." className={inputCls} />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Topic</label>
        <input name="topic" value={form.topic} onChange={handleChange} placeholder="e.g. Calculus, Data Structures" className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Tags (comma separated)</label>
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="react, hooks, state" className={inputCls} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" icon={HiOutlineSave}>{resource ? 'Update' : 'Add Resource'}</Button>
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel} icon={HiX}>Cancel</Button>}
      </div>
    </motion.form>
  );
}
