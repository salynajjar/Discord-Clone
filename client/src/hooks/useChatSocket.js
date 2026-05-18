import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import * as channelApi from '../api/channels.js';
import { SOCKET_URL } from '../config.js';

export function useChatSocket(token, user, activeChannel) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    if (!token || !user) return;

    const socket = io(SOCKET_URL, {
      auth: { token, user },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('new-message', (msg) => {
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
  }, [token, user]);

  useEffect(() => {
    const channelId = activeChannel?._id;
    const socket = socketRef.current;
    if (!channelId || !socket) return;

    let cancelled = false;
    setLoadingMessages(true);
    setMessages([]);

    channelApi
      .fetchMessages(channelId)
      .then((history) => {
        if (!cancelled) setMessages(history);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoadingMessages(false);
      });

    socket.emit('join-channel', { channelId });

    return () => {
      cancelled = true;
      socket.emit('leave-channel', { channelId });
    };
  }, [activeChannel?._id]);

  const sendMessage = useCallback(
    (content) => {
      if (!activeChannel?._id || !socketRef.current) return;
      socketRef.current.emit('send-message', {
        channelId: activeChannel._id,
        content,
      });
    },
    [activeChannel?._id]
  );

  return { connected, messages, loadingMessages, sendMessage };
}
