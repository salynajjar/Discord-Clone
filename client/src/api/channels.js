import api from './axios.js';

export async function fetchChannels() {
  const { data } = await api.get('/channels');
  return data.channels;
}

export async function createChannel(name, description = '') {
  const { data } = await api.post('/channels', { name, description });
  return data.channel;
}

export async function fetchMessages(channelId) {
  const { data } = await api.get(`/channels/${channelId}/messages`);
  return data.messages;
}
