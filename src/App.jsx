import { Route, Routes } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SessionProvider><HomePage /></SessionProvider>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
