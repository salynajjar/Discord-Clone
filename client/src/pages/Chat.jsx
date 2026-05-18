import { useAuth } from '../context/AuthContext.jsx';
import { useChannels } from '../hooks/useChannels.js';
import { useChatSocket } from '../hooks/useChatSocket.js';
import ChannelSidebar from '../components/ChannelSidebar.jsx';
import ChatHeader from '../components/ChatHeader.jsx';
import MessageList from '../components/MessageList.jsx';
import MessageInput from '../components/MessageInput.jsx';

export default function Chat() {
  const { user, token, logout } = useAuth();
  const { channels, activeChannel, setActiveChannel, loading, createChannel } = useChannels();
  const { connected, messages, loadingMessages, sendMessage } = useChatSocket(
    token,
    user,
    activeChannel
  );

  return (
    <div className="chat-app">
      <aside className="server-bar">
        <div className="server-icon" title="Discord Clone">
          DC
        </div>
      </aside>

      <ChannelSidebar
        channels={channels}
        activeChannel={activeChannel}
        onSelect={setActiveChannel}
        onCreate={createChannel}
        loading={loading}
      />

      <main className="chat-main">
        <ChatHeader
          channelName={activeChannel?.name}
          connected={connected}
          user={user}
          onLogout={logout}
        />

        {activeChannel ? (
          <>
            <MessageList
              messages={messages}
              currentUserId={user?.id}
              loading={loadingMessages}
            />
            <MessageInput
              onSend={sendMessage}
              disabled={!connected}
              channelName={activeChannel.name}
            />
          </>
        ) : (
          <div className="chat-empty">
            <p>Select or create a channel to start chatting.</p>
          </div>
        )}
      </main>
    </div>
  );
}
