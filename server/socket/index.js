import { Server } from 'socket.io';
import Channel from '../models/Channel.js';
import Message from '../models/Message.js';
import { verifySocketToken } from '../middleware/auth.js';
import { DEFAULT_ACCENT } from '../constants.js';
import { serializeMessage } from '../utils/serializeMessage.js';

export function initSocket(httpServer, clientUrl) {
  const io = new Server(httpServer, {
    cors: { origin: clientUrl, methods: ['GET', 'POST'] },
  });

  io.use((socket, next) => {
    const payload = verifySocketToken(socket.handshake.auth?.token);
    if (!payload) return next(new Error('Unauthorized'));
    socket.user = { id: payload.id, username: payload.username };
    next();
  });

  io.on('connection', (socket) => {
    socket.on('join-channel', async ({ channelId }) => {
      try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
          socket.emit('error', { message: 'Channel not found' });
          return;
        }
        if (socket.currentChannel) socket.leave(socket.currentChannel);
        socket.currentChannel = channelId;
        socket.join(channelId);
        socket.emit('joined-channel', { channelId, channelName: channel.name });
      } catch (err) {
        console.error('join-channel error:', err);
        socket.emit('error', { message: 'Could not join channel' });
      }
    });

    socket.on('leave-channel', ({ channelId }) => {
      socket.leave(channelId);
      if (socket.currentChannel === channelId) socket.currentChannel = null;
    });

    socket.on('send-message', async ({ channelId, content }) => {
      try {
        const text = content?.trim();
        if (!text) return;

        const channel = await Channel.findById(channelId);
        if (!channel) {
          socket.emit('error', { message: 'Channel not found' });
          return;
        }

        const avatarColor =
          socket.handshake.auth?.user?.avatarColor || DEFAULT_ACCENT;

        const message = await Message.create({
          channel: channelId,
          user: socket.user.id,
          username: socket.user.username,
          avatarColor,
          content: text,
        });

        io.to(channelId).emit('new-message', serializeMessage(message, channelId));
      } catch (err) {
        console.error('send-message error:', err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });
  });

  return io;
}
