import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Code2, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? 'bg-indigo-500/20 text-indigo-200' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  const displayName = user?.fullName ? user.fullName.split(' ')[0] : 'Developer';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/40">
            <Code2 className="h-5 w-5 text-indigo-300" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">CodeQuest</div>
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
              <Link to="/login" className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 hover:border-slate-600 transition">
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
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 px-3.5 py-2 text-sm font-medium text-indigo-200 hover:bg-indigo-500/30 transition"
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

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden space-y-3">
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
