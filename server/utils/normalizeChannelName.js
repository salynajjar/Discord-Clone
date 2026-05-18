export function normalizeChannelName(raw) {
  return raw?.trim().toLowerCase().replace(/\s+/g, '-') || '';
}
