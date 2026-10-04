import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ShieldCheck, Navigation } from 'lucide-react';
import { TrainBetween } from '../types';

interface TrainRowProps {
  train: TrainBetween;
}

export const TrainRow: React.FC<TrainRowProps> = ({ train }) => {
  const getBadgeColor = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'RAJDHANI':
      case 'SHATABDI':
      case 'VANDE BHARAT':
        return 'bg-[#E63946]/20 text-[#E63946] border-[#E63946]/30';
      case 'SUPERFAST':
        return 'bg-[#2F80ED]/20 text-[#2F80ED] border-[#2F80ED]/30';
      default:
        return 'bg-[#16A34A]/20 text-[#16A34A] border-[#16A34A]/30';
    }
  };

  const daysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-[#0B1626] border border-[#1E2D45] hover:border-[#2F80ED]/50 rounded-2xl p-5 transition-all duration-200 shadow-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Train Details & Name */}
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#122035] text-slate-200 border border-[#1E2D45]">
              #{train.trainNumber}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${getBadgeColor(train.trainType)}`}>
              {train.trainType || 'EXPRESS'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-wide">{train.trainName}</h3>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Runs on: </span>
            <div className="flex gap-1">
              {daysList.map((day) => {
                const isRunning = train.runsOn?.includes(day) || true;
                return (
                  <span
                    key={day}
                    className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${
                      isRunning ? 'bg-[#122035] text-[#2F80ED] border border-[#2F80ED]/40' : 'text-slate-600 bg-slate-900/40'
                    }`}
                  >
                    {day[0]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Schedule & Duration Timeline */}
        <div className="flex-1 w-full lg:w-auto flex items-center justify-between gap-4 bg-[#07111F]/60 p-4 rounded-xl border border-[#1E2D45]/60">
          <div className="text-center sm:text-left">
            <div className="text-xl font-bold font-mono text-white">{train.departureTime}</div>
            <div className="text-xs font-semibold text-slate-300 uppercase">{train.fromStation}</div>
          </div>

          <div className="flex-1 flex flex-col items-center max-w-[160px]">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-[#2F80ED]" />
              {train.duration}
            </span>
            <div className="w-full flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#2F80ED]"></div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-[#2F80ED] via-[#16A34A] to-[#E63946]"></div>
              <div className="w-2 h-2 rounded-full bg-[#E63946]"></div>
            </div>
            {train.distance && (
              <span className="text-[10px] text-slate-500 font-mono mt-1">{train.distance} km</span>
            )}
          </div>

          <div className="text-center sm:text-right">
            <div className="text-xl font-bold font-mono text-white">{train.arrivalTime}</div>
            <div className="text-xs font-semibold text-slate-300 uppercase">{train.toStation}</div>
          </div>
        </div>

        {/* Classes & CTAs */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-3 min-w-[200px]">
          <div className="flex items-center gap-1.5 flex-wrap">
            {train.availableClasses?.map((cls) => (
              <span
                key={cls}
                className="px-2 py-1 rounded bg-[#122035] border border-[#1E2D45] text-slate-200 text-xs font-mono font-bold hover:border-[#2F80ED] cursor-pointer transition-colors"
              >
                {cls}
              </span>
            ))}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              to={`/track/${train.trainNumber}`}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-[#2F80ED] border border-[#2F80ED]/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Live Track
            </Link>

            <Link
              to={`/availability?train=${train.trainNumber}&from=${train.fromStation}&to=${train.toStation}&date=${new Date().toISOString().split('T')[0]}&class=3A`}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#2F80ED] hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Seats & Fare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
