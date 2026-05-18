import { DEFAULT_ACCENT } from '../config.js';
import { userInitial } from '../utils/format.js';

export default function ChatHeader({ channelName, connected, user, onLogout }) {
  return (
    <header className="chat-header">
      <span className="channel-hash">#</span>
      <h2>{channelName || 'Select a channel'}</h2>
      <span
        className={`status-dot ${connected ? 'online' : 'offline'}`}
        title={connected ? 'Connected' : 'Reconnecting'}
      />
      <div className="header-user">
        <span
          className="user-avatar"
          style={{ backgroundColor: user?.avatarColor || DEFAULT_ACCENT }}
        >
          {userInitial(user?.username)}
        </span>
        <span className="user-name">{user?.username}</span>
        <button type="button" className="btn-logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
