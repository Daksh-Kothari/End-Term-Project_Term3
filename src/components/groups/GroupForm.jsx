import { useState } from 'react';
import Button from '../ui/Button';
import { SUBJECTS } from '../../utils/constants';
import { HiOutlinePlus } from 'react-icons/hi';

export default function GroupForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', description: '', subject: '', isPublic: true });
  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [e.target.name]: val }));
  };
  const handleSubmit = (e) => { e.preventDefault(); if (form.name) onSubmit(form); };
  const inputCls = 'w-full px-4 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm text-surface-900 dark:text-surface-100 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Group Name *</label>
        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. CS101 Study Group" className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What's this group about?" className={inputCls} />
      </div>
      <div>
        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Subject</label>
        <select name="subject" value={form.subject} onChange={handleChange} className={inputCls}>
          <option value="">Select subject</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
        <span className="text-sm text-surface-700 dark:text-surface-300">Make this group public</span>
      </label>
      <div className="flex gap-3 pt-2">
        <Button type="submit" icon={HiOutlinePlus}>Create Group</Button>
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}
