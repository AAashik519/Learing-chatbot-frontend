import ChatInput from '../components/chat/ChatInput';
import ChatWindow from '../components/chat/ChatWindow';
import ModeSwitch from '../components/chat/ModeSwitch';
import QuickReplies from '../components/chat/QuickReplies';
import ErrorBanner from '../components/common/ErrorBanner';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import ActivityCard from '../components/learning/ActivityCard';
import MoodSelector from '../components/mood/MoodSelector';
import { useSession } from '../hooks/useSession';

const STARTER_REPLIES = ['Hello', "Let's learn", "Let's play"];

export default function HomePage() {
  const {
    messages,
    level,
    levelName,
    modeLabel,
    mood,
    progress,
    activity,
    quickReplies,
    durable,
    loading,
    hydrating,
    error,
    hasPending,
    sendMessage,
    sendMood,
    retry,
    reset,
    reload,
  } = useSession();

  const replies = quickReplies.length
    ? quickReplies
    : (!hydrating && messages.length === 0 ? STARTER_REPLIES : []);

  function handleRetry() {
    if (hasPending) retry();
    else reload();
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header
        level={level}
        levelName={levelName}
        stars={progress ? progress.stars : null}
        onReset={reset}
        disabled={loading}
      />
      <main className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 gap-3 px-3 py-3 sm:gap-4 md:px-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-6">
        <Sidebar level={level} progress={progress} durable={durable} />
        <div className="flex min-h-0 min-w-0 flex-col gap-2 sm:gap-3">
          <ActivityCard activity={activity} modeLabel={modeLabel} />
          <ChatWindow messages={messages} loading={loading} hydrating={hydrating} />
          <div className="shrink-0 space-y-2 bg-cream/80 pb-[max(0.25rem,env(safe-area-inset-bottom))] sm:space-y-3">
            <ErrorBanner message={error} onRetry={handleRetry} disabled={loading} />
            <QuickReplies replies={replies} onSelect={sendMessage} disabled={loading || hydrating} />
            <ModeSwitch onSelect={sendMessage} disabled={loading || hydrating} />
            <MoodSelector mood={mood} onSelect={sendMood} disabled={loading || hydrating} />
            <ChatInput onSend={sendMessage} disabled={loading || hydrating} />
          </div>
        </div>
      </main>
    </div>
  );
}
