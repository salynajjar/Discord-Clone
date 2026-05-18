export function getApiError(err, fallback) {
  return err.response?.data?.error || fallback;
}
