import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigation, Train, Search, MapPin, Ticket, ShieldCheck, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/trains', label: 'Train Search', icon: Search },
    { path: '/track/12301', label: 'Track Train', icon: Navigation },
    { path: '/station/NDLS', label: 'Station Board', icon: MapPin },
    { path: '/pnr', label: 'PNR Status', icon: Ticket },
    { path: '/availability', label: 'Availability', icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('/')[1]);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07111F]/90 backdrop-blur-md border-b border-[#1E2D45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E63946] to-[#B91C1C] flex items-center justify-center shadow-lg shadow-[#E63946]/20 group-hover:scale-105 transition-transform duration-200">
            <Train className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider text-white flex items-center gap-1.5">
              RAILETA
              <span className="inline-block w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 block tracking-widest uppercase">
              Live Network Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                  active
                    ? 'bg-[#122035] text-white border border-[#2F80ED]/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-[#0B1626]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#2F80ED]' : 'text-slate-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status indicator badge */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#0B1626] border border-[#1E2D45] text-xs text-slate-300">
          <Activity className="w-3.5 h-3.5 text-[#16A34A] animate-spin" />
          <span className="font-semibold text-slate-200">System Online</span>
        </div>
      </div>
    </header>
  );
};
