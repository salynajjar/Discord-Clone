export function serializeMessage(doc, channelId) {
  return {
    id: doc._id.toString(),
    channelId: channelId || doc.channel.toString(),
    userId: doc.user.toString(),
    username: doc.username,
    avatarColor: doc.avatarColor,
    content: doc.content,
    createdAt: doc.createdAt,
  };
}
