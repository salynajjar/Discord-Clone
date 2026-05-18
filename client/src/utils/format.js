export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function userInitial(name) {
  return name?.[0]?.toUpperCase() || '?';
}
