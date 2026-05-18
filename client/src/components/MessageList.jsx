import { useEffect, useRef } from 'react';
import { DEFAULT_ACCENT } from '../config.js';
import { formatTime, userInitial } from '../utils/format.js';

export default function MessageList({ messages, currentUserId, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="message-list loading">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <p className="no-messages">No messages yet. Say hello!</p>
      ) : (
        messages.map((msg) => (
          <article
            key={msg.id}
            className={`message ${msg.userId === currentUserId ? 'own' : ''}`}
          >
            <div className="msg-avatar"
              style={{ backgroundColor: msg.avatarColor || DEFAULT_ACCENT }}
            >
              {userInitial(msg.username)}
            </div>
            <div className="msg-body">
              <header>
                <span className="msg-author">{msg.username}</span>
                <time dateTime={msg.createdAt}>{formatTime(msg.createdAt)}</time>
              </header>
              <p>{msg.content}</p>
            </div>
          </article>
        ))
      )}
      <span ref={bottomRef} />
    </div>
  );
}
