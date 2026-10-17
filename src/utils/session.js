const STORAGE_KEY = 'littleEnglishBuddy.sessionId';
const SESSION_PATTERN = /^[A-Za-z0-9_-]{8,64}$/;

function randomPart() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID().replace(/-/g, '').slice(0, 24);
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

export function getOrCreateSessionId() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing && SESSION_PATTERN.test(existing)) return existing;
  const sessionId = `sess_${randomPart()}`.slice(0, 64);
  localStorage.setItem(STORAGE_KEY, sessionId);
  return sessionId;
}
