import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTrainBetween } from '../hooks/useRailway';
import { TrainRow } from '../components/TrainRow';
import { Search, MapPin, Calendar, ArrowRightLeft, Filter, AlertCircle, RefreshCw } from 'lucide-react';

export const TrainSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [from, setFrom] = useState(searchParams.get('from') || 'NDLS');
  const [to, setTo] = useState(searchParams.get('to') || 'HWH');
  const [date, setDate] = useState(searchParams.get('date') || new Date().toISOString().split('T')[0]);

  // Filter states
  const [classFilter, setClassFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const { data: trains, isLoading, isError, error, refetch } = useTrainBetween(from, to, date);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ from: from.toUpperCase(), to: to.toUpperCase(), date });
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const filteredTrains = (trains || []).filter((train) => {
    if (classFilter !== 'ALL' && !train.availableClasses?.includes(classFilter)) {
      return false;
    }
    if (typeFilter !== 'ALL' && train.trainType?.toUpperCase() !== typeFilter.toUpperCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header Search Banner */}
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-black text-white tracking-wide uppercase mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-[#E63946]" />
          Train Journey Search
        </h1>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2F80ED]" /> From Station
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g. NDLS"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-3 text-white font-medium uppercase focus:outline-none"
              required
            />
          </div>

          <div className="md:col-span-1 flex items-center justify-center">
            <button
              type="button"
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-[#122035] border border-[#1E2D45] hover:border-[#2F80ED] text-slate-300 hover:text-white flex items-center justify-center transition-transform hover:rotate-180 duration-300"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E63946]" /> To Station
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="e.g. HWH"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#E63946] rounded-xl px-4 py-3 text-white font-medium uppercase focus:outline-none"
              required
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#16A34A]" /> Journey Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#16A34A] rounded-xl px-3.5 py-3 text-white font-medium focus:outline-none"
              required
            />
          </div>

          <div className="md:col-span-12 flex justify-end mt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#E63946] to-[#B91C1C] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E63946]/20 hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              SEARCH TRAINS
            </button>
          </div>
        </form>
      </div>

      {/* Filter Bar & Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#07111F] p-4 rounded-xl border border-[#1E2D45]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-200">
            Found {filteredTrains.length} trains
          </span>
          <span className="text-xs text-slate-500">
            ({from.toUpperCase()} → {to.toUpperCase()})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-[#2F80ED]" /> Filter Class:
          </div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="bg-[#122035] border border-[#1E2D45] text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Classes</option>
            <option value="1A">1A (First AC)</option>
            <option value="2A">2A (2-Tier AC)</option>
            <option value="3A">3A (3-Tier AC)</option>
            <option value="SL">SL (Sleeper)</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#122035] border border-[#1E2D45] text-white text-xs font-semibold rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Train Types</option>
            <option value="RAJDHANI">Rajdhani Express</option>
            <option value="SUPERFAST">Superfast</option>
            <option value="EXPRESS">Express</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 animate-pulse space-y-4">
              <div className="h-4 bg-[#122035] rounded w-1/4"></div>
              <div className="h-8 bg-[#122035] rounded w-1/2"></div>
              <div className="h-12 bg-[#122035] rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Railway Service Temporarily Unavailable</h3>
          <p className="text-xs text-slate-400">
            {(error as Error)?.message || "We couldn't retrieve train schedules right now. Please try refreshing."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-white text-xs font-bold border border-[#1E2D45] inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-[#2F80ED]" />
            Try Again
          </button>
        </div>
      )}

      {/* Results List */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {filteredTrains.length === 0 ? (
            <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-12 text-center max-w-lg mx-auto space-y-3">
              <div className="text-4xl">🚆</div>
              <h3 className="text-lg font-bold text-white">No Trains Found</h3>
              <p className="text-xs text-slate-400">
                We couldn't find any direct trains matching journey from <span className="font-mono text-white">{from}</span> to <span className="font-mono text-white">{to}</span>. Try adjusting your station codes or date.
              </p>
            </div>
          ) : (
            filteredTrains.map((train) => <TrainRow key={train.trainNumber} train={train} />)
          )}
        </div>
      )}
    </div>
  );
};
