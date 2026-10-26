import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Code2, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMobileMenuOpen(false);
      setLogoutError('');
    } catch (error) {
      setLogoutError(error.message || 'Unable to sign out.');
    }
  };

  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-indigo-500/15 text-indigo-200' : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
    }`;

  const displayName = user?.fullName ? user.fullName.split(' ')[0] : 'Developer';

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-slate-950/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-extrabold tracking-tight">CodeQuest</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/problems" className={navClass}>Problems</NavLink>
          <NavLink to="/study-plan" className={navClass}>Study Plan</NavLink>
          {isAuthenticated ? (
            <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-white/20 hover:bg-white/[0.06]">
                Login
              </Link>
              <Link to="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-400/10 px-3.5 py-2 text-sm font-medium text-indigo-100 transition hover:bg-indigo-400/15"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <span className="text-sm text-slate-300">Hi, {displayName}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 hover:border-slate-600 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {logoutError ? (
        <div className="mx-auto max-w-7xl px-4 pb-3 text-sm text-rose-300 sm:px-6 lg:px-8">
          {logoutError}
        </div>
      ) : null}

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-white/[0.07] bg-slate-950/95 px-4 py-4 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-1">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={navClass}>Home</NavLink>
            <NavLink to="/problems" onClick={() => setMobileMenuOpen(false)} className={navClass}>Problems</NavLink>
            <NavLink to="/study-plan" onClick={() => setMobileMenuOpen(false)} className={navClass}>Study Plan</NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={navClass}>Dashboard</NavLink>
            )}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-center text-sm font-medium text-slate-100"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <div className="text-xs text-slate-400 px-1">Signed in as <strong className="text-white">{displayName}</strong></div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
