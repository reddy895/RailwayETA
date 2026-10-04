import React from 'react';
import { TrainInfo } from '../types';
import { Clock, Calendar, MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrainHeaderProps {
  train: TrainInfo;
}

export const TrainHeader: React.FC<TrainHeaderProps> = ({ train }) => {
  return (
    <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#1E2D45] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#E63946] text-white font-mono font-black text-sm">
              #{train.trainNumber}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-[#2F80ED]/20 text-[#2F80ED] border border-[#2F80ED]/30 text-xs font-bold uppercase tracking-wider">
              {train.trainType || 'EXPRESS'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            {train.trainName}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#2F80ED]" />
            <span className="font-bold text-slate-200">{train.source}</span>
            <span>→</span>
            <span className="font-bold text-slate-200">{train.destination}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/track/${train.trainNumber}`}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2F80ED] to-blue-600 text-white font-bold text-xs tracking-wide shadow-lg shadow-[#2F80ED]/20 hover:brightness-110 transition-all flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            LIVE TRACKING
          </Link>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-3.5 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
          <span className="text-base font-bold text-white font-mono flex items-center justify-center gap-1 mt-0.5">
            <Clock className="w-3.5 h-3.5 text-[#2F80ED]" />
            {train.totalDuration}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Distance</span>
          <span className="text-base font-bold text-white font-mono mt-0.5 block">
            {train.totalDistance} km
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Stops</span>
          <span className="text-base font-bold text-white font-mono mt-0.5 block">
            {train.stations?.length || 0} Stations
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Runs On</span>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Calendar className="w-3.5 h-3.5 text-[#16A34A]" />
            <span className="text-xs font-bold text-slate-200">Daily</span>
          </div>
        </div>
      </div>
    </div>
  );
};
