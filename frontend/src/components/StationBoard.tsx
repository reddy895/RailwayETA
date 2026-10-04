import React, { useState } from 'react';
import { StationBoardEntry } from '../types';
import { Clock, ArrowRight, Building2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StationBoardProps {
  entries: StationBoardEntry[];
  stationCode: string;
  stationName: string;
}

export const StationBoard: React.FC<StationBoardProps> = ({
  entries,
  stationCode,
  stationName,
}) => {
  const [activeTab, setActiveTab] = useState<'arrivals' | 'departures' | 'all'>('all');

  const filteredEntries = entries.filter((entry) => {
    if (activeTab === 'arrivals') return entry.scheduledArrival && entry.scheduledArrival !== 'Source';
    if (activeTab === 'departures') return entry.scheduledDeparture && entry.scheduledDeparture !== 'Destination';
    return true;
  });

  const getStatusBadge = (entry: StationBoardEntry) => {
    if (entry.status === 'CANCELLED') {
      return (
        <span className="px-2.5 py-1 rounded bg-[#DC2626]/20 text-[#DC2626] border border-[#DC2626]/30 text-xs font-bold flex items-center gap-1">
          <XCircle className="w-3.5 h-3.5" />
          CANCELLED
        </span>
      );
    }
    if (entry.delayMinutes > 0) {
      return (
        <span className="px-2.5 py-1 rounded bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-bold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          +{entry.delayMinutes} min
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 text-xs font-bold flex items-center gap-1">
        <CheckCircle className="w-3.5 h-3.5" />
        ON TIME
      </span>
    );
  };

  return (
    <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1E2D45] pb-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-wide flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#F59E0B]" />
            {stationName} <span className="text-[#F59E0B] font-mono">({stationCode.toUpperCase()})</span>
          </h2>
          <p className="text-xs text-slate-400">Live Train Movement Board</p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center bg-[#122035] p-1 rounded-xl border border-[#1E2D45] text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all' ? 'bg-[#2F80ED] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Passing
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('arrivals')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'arrivals' ? 'bg-[#2F80ED] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Arrivals
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('departures')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'departures' ? 'bg-[#2F80ED] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Departures
          </button>
        </div>
      </div>

      {/* Railway Information Board Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-[#1E2D45] text-slate-400 uppercase tracking-wider font-bold">
              <th className="pb-3 px-3">Time</th>
              <th className="pb-3 px-3">Train</th>
              <th className="pb-3 px-3">Origin → Destination</th>
              <th className="pb-3 px-3">PF</th>
              <th className="pb-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2D45]/60">
            {filteredEntries.map((entry, idx) => (
              <tr key={idx} className="hover:bg-[#122035]/40 transition-colors group">
                <td className="py-4 px-3 font-mono">
                  <div className="text-white font-bold text-sm">
                    {entry.scheduledArrival !== 'Source' ? entry.scheduledArrival : entry.scheduledDeparture}
                  </div>
                  {entry.actualArrival && (
                    <div className="text-[#16A34A] text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {entry.actualArrival}
                    </div>
                  )}
                </td>

                <td className="py-4 px-3">
                  <Link
                    to={`/track/${entry.trainNumber}`}
                    className="group-hover:text-[#2F80ED] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#122035] text-slate-200 border border-[#1E2D45]">
                        #{entry.trainNumber}
                      </span>
                      <span className="font-bold text-white text-sm">{entry.trainName}</span>
                    </div>
                  </Link>
                </td>

                <td className="py-4 px-3 text-slate-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span>{entry.origin}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span>{entry.destination}</span>
                  </div>
                </td>

                <td className="py-4 px-3">
                  <span className="px-2.5 py-1 rounded bg-[#122035] font-mono font-bold text-slate-200 border border-[#1E2D45]">
                    PF {entry.platform || '1'}
                  </span>
                </td>

                <td className="py-4 px-3 text-right">{getStatusBadge(entry)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
