import { Router } from 'express';
import Channel from '../models/Channel.js';
import Message from '../models/Message.js';
import { requireAuth } from '../middleware/auth.js';
import { serializeMessage } from '../utils/serializeMessage.js';
import { normalizeChannelName } from '../utils/normalizeChannelName.js';

const router = Router();

router.use(requireAuth);

router.get('/', async (_req, res) => {
  try {
    const channels = await Channel.find().sort({ isDefault: -1, name: 1 });
    res.json({ channels });
  } catch (err) {
    console.error('List channels error:', err);
    res.status(500).json({ error: 'Failed to load channels' });
  }
});

router.post('/', async (req, res) => {
  try {
    const name = normalizeChannelName(req.body.name);
    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Channel name must be at least 2 characters' });
    }

    if (await Channel.findOne({ name })) {
      return res.status(409).json({ error: 'Channel already exists' });
    }

    const channel = await Channel.create({
      name,
      description: req.body.description?.trim() || '',
    });

    res.status(201).json({ channel });
  } catch (err) {
    console.error('Create channel error:', err);
    res.status(500).json({ error: 'Failed to create channel' });
  }
});

router.get('/:channelId/messages', async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const messages = await Message.find({ channel: channel._id })
      .sort({ createdAt: 1 })
      .limit(100)
      .lean();

    res.json({ messages: messages.map((m) => serializeMessage(m)) });
  } catch (err) {
    console.error('Load messages error:', err);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

export default router;
