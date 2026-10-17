import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

export async function sendChat(payload) {
  const response = await api.post('/chat', payload);
  if (!response.data?.success || !response.data?.data?.reply) {
    const error = new Error('The buddy did not send a reply.');
    error.response = response;
    throw error;
  }
  return response.data;
}

export async function fetchSession(sessionId) {
  const response = await api.get(`/chat/session/${encodeURIComponent(sessionId)}`);
  return response.data;
}

export async function resetSession(sessionId) {
  const response = await api.delete(`/chat/session/${encodeURIComponent(sessionId)}`);
  return response.data;
}

export function describeError(error) {
  if (error?.code === 'ECONNABORTED') {
    return 'This is taking too long. Please try again.';
  }
  if (!error?.response) {
    return 'I cannot reach the buddy right now. Please check the connection and try again.';
  }
  const status = error.response.status;
  if (status === 429) return 'Let us slow down a little. Please try again in a minute.';
  if (status === 404) return 'I could not find this session. You can start again.';
  if (status === 503) return 'Saving is not ready right now. Please try again soon.';
  if (status === 400) return 'Please say that in a shorter way and try again.';
  return 'Something went wrong. Please try again.';
}
