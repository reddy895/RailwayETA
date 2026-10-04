import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navigation, Search, MapPin, Ticket, ShieldCheck } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/trains', label: 'Trains', icon: Search },
    { path: '/track/12301', label: 'Live Track', icon: Navigation },
    { path: '/station/NDLS', label: 'Station Board', icon: MapPin },
    { path: '/pnr', label: 'PNR', icon: Ticket },
    { path: '/availability', label: 'Seats', icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('/')[1]);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07111F]/95 backdrop-blur-lg border-t border-[#1E2D45] px-2 py-2">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                active ? 'text-[#2F80ED] bg-[#122035]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
