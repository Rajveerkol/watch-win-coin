const KEY = "we_device_id";

/**
 * A stable per-device identifier used to enforce one account per device.
 * Combines a persisted random id with basic device characteristics so the
 * same browser/device keeps the same value across sessions.
 */
export function getDeviceId(): string {
  if (typeof window === "undefined") return "server";
  let stored = window.localStorage.getItem(KEY);
  if (!stored) {
    const parts = [
      navigator.userAgent,
      navigator.language,
      String(screen.width),
      String(screen.height),
      String(screen.colorDepth),
      String(new Date().getTimezoneOffset()),
      Math.random().toString(36).slice(2),
    ].join("|");
    let hash = 0;
    for (let i = 0; i < parts.length; i += 1) {
      hash = (hash * 31 + parts.charCodeAt(i)) | 0;
    }
    stored = `d_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
    window.localStorage.setItem(KEY, stored);
  }
  return stored;
}
