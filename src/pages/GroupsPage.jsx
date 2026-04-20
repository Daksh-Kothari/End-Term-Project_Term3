import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePlus, HiOutlineKey } from 'react-icons/hi';
import GroupCard from '../components/groups/GroupCard';
import GroupForm from '../components/groups/GroupForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { useGroups } from '../hooks/useGroups';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function GroupsPage() {
  const { myGroups, publicGroups, createGroup, joinGroup } = useGroups();
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const handleCreate = useCallback((data) => {
    createGroup(data);
    setShowCreate(false);
    toast.success('Group created! 🎉');
  }, [createGroup]);

  const handleJoin = useCallback(() => {
    const group = joinGroup(inviteCode.trim().toUpperCase());
    if (group) {
      toast.success(`Joined "${group.name}"!`);
      setShowJoin(false);
      setInviteCode('');
    } else {
      toast.error('Invalid invite code');
    }
  }, [inviteCode, joinGroup]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Study Groups</h1>
          <p className="text-surface-500 text-sm mt-1">Collaborate with classmates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={HiOutlineKey} onClick={() => setShowJoin(true)}>Join Group</Button>
          <Button icon={HiOutlinePlus} onClick={() => setShowCreate(true)}>Create Group</Button>
        </div>
      </motion.div>

      {/* My Groups */}
      <div>
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">My Groups</h2>
        {myGroups.length === 0 ? (
          <EmptyState icon={HiOutlineUserGroup} title="No groups yet" description="Create or join a study group to collaborate." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myGroups.map((g, i) => <GroupCard key={g.id} group={g} index={i} />)}
          </div>
        )}
      </div>

      {/* Public Groups */}
      {publicGroups.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Public Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicGroups.map((g, i) => <GroupCard key={g.id} group={g} index={i} onClick={() => {
              joinGroup(g.inviteCode);
              toast.success(`Joined "${g.name}"!`);
            }} />)}
          </div>
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Study Group">
        <GroupForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>

      {/* Join Modal */}
      <Modal isOpen={showJoin} onClose={() => setShowJoin(false)} title="Join a Group">
        <div className="space-y-4">
          <p className="text-sm text-surface-500">Enter the 6-character invite code shared by a group member.</p>
          <input
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder="e.g. ABC123"
            maxLength={6}
            className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center text-2xl font-mono tracking-[0.5em] text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button fullWidth onClick={handleJoin} disabled={inviteCode.length < 6}>Join Group</Button>
        </div>
      </Modal>
    </div>
  );
}
