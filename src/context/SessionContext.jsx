import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { describeError, fetchSession, resetSession, sendChat } from '../services/chatApi';
import { MOODS } from '../utils/moods';
import { getOrCreateSessionId } from '../utils/session';

const SessionContext = createContext(null);

const EMPTY_LEARNING = {
  level: null,
  levelName: '',
  mode: null,
  modeLabel: '',
  mood: null,
  progress: null,
  activity: null,
  quickReplies: [],
  durable: null,
};

export function SessionProvider({ children }) {
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [messages, setMessages] = useState([]);
  const [learning, setLearning] = useState(EMPTY_LEARNING);
  const [loading, setLoading] = useState(false);
  const [hydrating, setHydrating] = useState(true);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(null);
  const inFlight = useRef(false);

  const applyData = useCallback((data) => {
    setLearning({
      level: data.level || null,
      levelName: data.levelName || '',
      mode: data.mode || null,
      modeLabel: data.modeLabel || '',
      mood: data.mood || null,
      progress: data.progress || null,
      activity: data.activity || null,
      quickReplies: Array.isArray(data.quickReplies) ? data.quickReplies : [],
      durable: typeof data.durable === 'boolean' ? data.durable : null,
    });
  }, []);

  const loadSession = useCallback(async () => {
    setHydrating(true);
    setError('');
    try {
      const body = await fetchSession(sessionId);
      if (!body?.success || !body.data) throw new Error('missing session');
      setMessages((body.data.conversation || []).map((turn, index) => ({
        id: `saved-${index}`,
        role: turn.role === 'child' ? 'child' : 'buddy',
        text: turn.text,
        mode: turn.mode || null,
        modeLabel: turn.modeLabel || '',
      })));
      applyData(body.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setMessages([]);
        setLearning(EMPTY_LEARNING);
      } else {
        setError(describeError(err));
      }
    } finally {
      setHydrating(false);
    }
  }, [applyData, sessionId]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const deliver = useCallback(async (payload, { appendChild }) => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError('');
    setPending(payload);
    if (appendChild) {
      setMessages((current) => [
        ...current,
        { id: `child-${Date.now()}`, role: 'child', text: payload.message, mode: null },
      ]);
    }

    try {
      const body = await sendChat(payload);
      applyData(body.data);
      setMessages((current) => [
        ...current,
        {
          id: `buddy-${Date.now()}`,
          role: 'buddy',
          text: body.data.reply,
          mode: body.data.mode,
          modeLabel: body.data.modeLabel,
        },
      ]);
      setPending(null);
    } catch (err) {
      setError(describeError(err));
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, [applyData]);

  const sendMessage = useCallback((text, selectedMood) => {
    const message = String(text || '').trim();
    if (!message || inFlight.current) return;
    const payload = { sessionId, message };
    if (selectedMood) payload.selectedMood = selectedMood;
    return deliver(payload, { appendChild: true });
  }, [deliver, sessionId]);

  const sendMood = useCallback((moodId) => {
    const mood = MOODS.find((item) => item.id === moodId);
    if (!mood || inFlight.current) return;
    return deliver({
      sessionId,
      message: mood.message,
      selectedMood: mood.id,
    }, { appendChild: true });
  }, [deliver, sessionId]);

  const retry = useCallback(() => {
    if (!pending || inFlight.current) return;
    return deliver(pending, { appendChild: false });
  }, [deliver, pending]);

  const reset = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError('');
    try {
      await resetSession(sessionId);
      setMessages([]);
      setLearning(EMPTY_LEARNING);
      setPending(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setMessages([]);
        setLearning(EMPTY_LEARNING);
        setPending(null);
      } else {
        setError(describeError(err));
      }
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }, [sessionId]);

  const value = useMemo(() => ({
    sessionId,
    messages,
    ...learning,
    loading,
    hydrating,
    error,
    canRetry: Boolean(error),
    hasPending: Boolean(pending),
    sendMessage,
    sendMood,
    retry,
    reset,
    reload: loadSession,
  }), [
    sessionId,
    messages,
    learning,
    loading,
    hydrating,
    error,
    pending,
    sendMessage,
    sendMood,
    retry,
    reset,
    loadSession,
  ]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return value;
}
