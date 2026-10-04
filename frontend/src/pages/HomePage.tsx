import React from 'react';
import { Link } from 'react-router-dom';
import { SearchPanel } from '../components/SearchPanel';
import {
  Navigation,
  Train,
  Building2,
  Ticket,
  Activity,
  ArrowRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#122035] border border-[#1E2D45] text-xs font-semibold text-[#2F80ED] tracking-wide">
          <Activity className="w-3.5 h-3.5 text-[#16A34A] animate-pulse" />
          <span>Real-Time Indian Railways Live Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Know where your train is. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-slate-200 to-[#E63946] bg-clip-text text-transparent">
            Know when you'll arrive.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Live railway tracking, train schedules, station live boards, PNR status, and journey intelligence in one place. Powered by normalized RailKit API.
        </p>

        {/* Main Search Panel */}
        <div className="pt-6">
          <SearchPanel />
        </div>
      </section>

      {/* Featured Services Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">FEATURED RAILWAY SERVICES</h2>
            <p className="text-xs text-slate-400">Select a tool to get instant live railway telemetry</p>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            RAILETA v1.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/track/12301"
            className="group p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] hover:border-[#2F80ED]/60 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2F80ED]/10 text-[#2F80ED] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#2F80ED] transition-colors flex items-center justify-between">
              Live Track Train
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Track current station, exact delay minutes, vertical route timeline & ETA countdown.
            </p>
          </Link>

          <Link
            to="/trains"
            className="group p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] hover:border-[#E63946]/60 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Train className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#E63946] transition-colors flex items-center justify-between">
              Train Schedule
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Search trains between stations, duration, running days & station halt lists.
            </p>
          </Link>

          <Link
            to="/station/SBC"
            className="group p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] hover:border-[#F59E0B]/60 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#F59E0B] transition-colors flex items-center justify-between">
              Station Board
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Live arrival and departure board for any junction with platform numbers & delays.
            </p>
          </Link>

          <Link
            to="/pnr"
            className="group p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] hover:border-[#16A34A]/60 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#16A34A] transition-colors flex items-center justify-between">
              PNR Status
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Check 10-digit PNR booking status, coach position, berth allotment & chart status.
            </p>
          </Link>
        </div>
      </section>

      {/* Network Live Telemetry Statistics */}
      <section className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-8">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl font-black text-white tracking-wide">LIVE NETWORK INTELLIGENCE</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest">Normalized Data Metrics</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-[#122035]/50 border border-[#1E2D45]">
            <div className="text-3xl font-black text-white font-mono">12,650+</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Trains Tracked Daily</div>
          </div>
          <div className="p-4 rounded-xl bg-[#122035]/50 border border-[#1E2D45]">
            <div className="text-3xl font-black text-[#16A34A] font-mono">99.4%</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">ETA Accuracy Rate</div>
          </div>
          <div className="p-4 rounded-xl bg-[#122035]/50 border border-[#1E2D45]">
            <div className="text-3xl font-black text-[#2F80ED] font-mono">7,325</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Stations Covered</div>
          </div>
          <div className="p-4 rounded-xl bg-[#122035]/50 border border-[#1E2D45]">
            <div className="text-3xl font-black text-[#F59E0B] font-mono">&lt; 90s</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">Cache Sync Interval</div>
          </div>
        </div>
      </section>

      {/* How RailETA Works */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white tracking-wide uppercase">How RailETA Works</h2>
          <p className="text-sm text-slate-400">Three simple steps to seamless journey clarity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] relative">
            <div className="w-10 h-10 rounded-full bg-[#E63946] text-white font-black flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Search</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter train number, station code, or origin-destination pair to query our backend API.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] relative">
            <div className="w-10 h-10 rounded-full bg-[#2F80ED] text-white font-black flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Track</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our normalized server fetches telemetry via RailKit SDK, updates cache, and calculates live station ETA.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1626] border border-[#1E2D45] relative">
            <div className="w-10 h-10 rounded-full bg-[#16A34A] text-white font-black flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Arrive</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stay updated with precision station countdowns, delay alerts, and live platform indicators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
