import { useCallback, useEffect, useState } from 'react';
import * as channelApi from '../api/channels.js';

export function useChannels() {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    channelApi
      .fetchChannels()
      .then((list) => {
        setChannels(list);
        if (list.length > 0) setActiveChannel(list[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const createChannel = useCallback(async (name) => {
    const channel = await channelApi.createChannel(name);
    setChannels((prev) => [...prev, channel].sort((a, b) => a.name.localeCompare(b.name)));
    setActiveChannel(channel);
  }, []);

  return { channels, activeChannel, setActiveChannel, loading, createChannel };
}
