import { useState } from 'react';
import { getApiError } from '../utils/errors.js';

export default function ChannelSidebar({
  channels,
  activeChannel,
  onSelect,
  onCreate,
  loading,
}) {
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setError('');
    setCreating(true);
    try {
      await onCreate(newName.trim());
      setNewName('');
      setShowForm(false);
    } catch (err) {
      setError(getApiError(err, 'Could not create channel'));
    } finally {
      setCreating(false);
    }
  }

  return (
    <aside className="channel-sidebar">
      <header className="sidebar-header">
        <h1>Discord Clone</h1>
      </header>

      <div className="channel-section">
        <div className="section-label">
          <span>TEXT CHANNELS</span>
          <button
            type="button"
            className="btn-icon"
            title="Create channel"
            onClick={() => setShowForm((v) => !v)}
          >
            +
          </button>
        </div>

        {showForm && (
          <form className="channel-create-form" onSubmit={handleCreate}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="new-channel"
              maxLength={32}
              autoFocus
            />
            <button type="submit" className="btn-small" disabled={creating}>
              {creating ? '...' : 'Add'}
            </button>
            {error && <p className="inline-error">{error}</p>}
          </form>
        )}

        <nav className="channel-list">
          {loading ? (
            <p className="channel-loading">Loading channels...</p>
          ) : (
            channels.map((ch) => (
              <button
                key={ch._id}
                type="button"
                className={`channel-item ${activeChannel?._id === ch._id ? 'active' : ''}`}
                onClick={() => onSelect(ch)}
              >
                <span className="hash">#</span>
                {ch.name}
              </button>
            ))
          )}
        </nav>
      </div>
    </aside>
  );
}
