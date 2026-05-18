import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: { type: String, required: true },
    avatarColor: { type: String, default: '#5865f2' },
    content: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true }
);

messageSchema.index({ channel: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
