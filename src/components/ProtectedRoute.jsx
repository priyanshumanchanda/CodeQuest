import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { readStorage } from '../utils/storage';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  // Also check stored session directly to eliminate any state-update race conditions on navigation
  const hasStoredSession = Boolean(
    readStorage('codequest_auth_user', null) ||
    readStorage('codequest-demo-current-user', null)
  );

  if (!isAuthenticated && !hasStoredSession) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
