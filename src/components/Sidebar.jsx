import { BarChart3, BookOpen, BriefcaseBusiness, LogOut, Settings, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const items = [
  { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { label: 'Problems', path: '/problems', icon: BriefcaseBusiness },
  { label: 'Study Plan', path: '/study-plan', icon: BookOpen },
  { label: 'Submissions', path: '/submissions', icon: BriefcaseBusiness },
  { label: 'Profile', path: '/profile', icon: UserRound },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950/80 p-4 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="mb-6 hidden items-center gap-3 lg:flex">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/40">
          <BarChart3 className="h-5 w-5 text-indigo-300" />
        </div>
        <div>
          <div className="text-lg font-semibold text-white">CodeQuest</div>
          <div className="text-xs text-slate-400">Learning workspace</div>
        </div>
      </div>

      <nav className="flex flex-wrap gap-2 lg:flex-col">
        {items.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-indigo-500/20 text-indigo-100 ring-1 ring-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={logout}
          className="mt-4 flex items-center gap-3 rounded-xl border border-slate-800 px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:border-slate-700 hover:bg-slate-900 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
