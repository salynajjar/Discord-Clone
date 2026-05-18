import Channel from './models/Channel.js';
import { DEFAULT_CHANNELS } from './constants.js';

export async function seedChannels() {
  for (const data of DEFAULT_CHANNELS) {
    await Channel.findOneAndUpdate(
      { name: data.name },
      { $setOnInsert: data },
      { upsert: true, new: true }
    );
  }
}
