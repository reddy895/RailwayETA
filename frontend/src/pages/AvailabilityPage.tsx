import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAvailability } from '../hooks/useRailway';
import { ShieldCheck, Search, DollarSign, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export const AvailabilityPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [train, setTrain] = useState(searchParams.get('train') || '12301');
  const [from, setFrom] = useState(searchParams.get('from') || 'NDLS');
  const [to, setTo] = useState(searchParams.get('to') || 'HWH');
  const [date, setDate] = useState(searchParams.get('date') || new Date().toISOString().split('T')[0]);
  const [coachClass, setCoachClass] = useState(searchParams.get('class') || '3A');
  const [quota, setQuota] = useState(searchParams.get('quota') || 'GN');

  const { data: availData, isLoading, isError, error, refetch } = useAvailability({
    train,
    from,
    to,
    date,
    coachClass,
    quota,
  });

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ train, from: from.toUpperCase(), to: to.toUpperCase(), date, class: coachClass, quota });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Search Input Form */}
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
        <h1 className="text-2xl font-black text-white tracking-wide uppercase mb-4 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#2F80ED]" />
          Seat Availability & Fare Enquiry
        </h1>

        <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Train Number
            </label>
            <input
              type="text"
              value={train}
              onChange={(e) => setTrain(e.target.value)}
              placeholder="e.g. 12301"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              From Station
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="NDLS"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-2.5 text-white uppercase font-bold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              To Station
            </label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="HWH"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-2.5 text-white uppercase font-bold focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Class
            </label>
            <select
              value={coachClass}
              onChange={(e) => setCoachClass(e.target.value)}
              className="w-full bg-[#122035] border border-[#1E2D45] text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="1A">1A (First AC)</option>
              <option value="2A">2A (2-Tier AC)</option>
              <option value="3A">3A (3-Tier AC)</option>
              <option value="SL">SL (Sleeper)</option>
              <option value="CC">CC (AC Chair)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Quota
            </label>
            <select
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              className="w-full bg-[#122035] border border-[#1E2D45] text-white text-xs font-bold rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="GN">General Quota (GN)</option>
              <option value="TQ">Tatkal Quota (TQ)</option>
              <option value="PT">Premium Tatkal (PT)</option>
              <option value="LD">Ladies Quota (LD)</option>
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#2F80ED] hover:bg-blue-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#2F80ED]/20 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              CHECK AVAILABILITY
            </button>
          </div>
        </form>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-8 animate-pulse max-w-4xl mx-auto space-y-4">
          <div className="h-6 bg-[#122035] rounded w-1/3"></div>
          <div className="h-24 bg-[#122035] rounded w-full"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Availability Check Failed</h3>
          <p className="text-xs text-slate-400">
            {(error as Error)?.message || "We couldn't retrieve seat availability. Verify parameters."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-white text-xs font-bold border border-[#1E2D45] inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-[#2F80ED]" />
            Retry
          </button>
        </div>
      )}

      {/* Availability Results Card */}
      {availData && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1E2D45] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#2F80ED] text-white font-mono font-bold text-xs">
                  #{availData.trainNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#122035] text-slate-300 text-xs font-bold border border-[#1E2D45]">
                  Class: {availData.class} | Quota: {availData.quota}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">{availData.trainName}</h2>
              <p className="text-xs text-slate-400 uppercase font-semibold">
                {availData.fromStation} → {availData.toStation} • Date: {availData.date}
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black text-[#16A34A] font-mono block">
                AVAILABLE-{availData.availableSeats}
              </span>
              <span className="text-xs text-slate-400 font-semibold flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                {availData.prediction || 'High booking confirmation probability'}
              </span>
            </div>
          </div>

          {/* Fare Breakdown Grid */}
          {availData.fare && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#16A34A]" />
                Fare Breakdown
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Base Fare</span>
                  <span className="text-sm font-bold text-white font-mono">₹{availData.fare.baseFare}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Reservation</span>
                  <span className="text-sm font-bold text-white font-mono">₹{availData.fare.reservation}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Superfast</span>
                  <span className="text-sm font-bold text-white font-mono">₹{availData.fare.superfast}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">GST</span>
                  <span className="text-sm font-bold text-white font-mono">₹{availData.fare.gst}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#122035]/60 border border-[#1E2D45]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Catering</span>
                  <span className="text-sm font-bold text-white font-mono">₹{availData.fare.catering}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#16A34A]/20 border border-[#16A34A]/40 text-[#16A34A]">
                  <span className="text-[10px] font-bold uppercase block">Total Fare</span>
                  <span className="text-base font-black font-mono">₹{availData.fare.totalFare}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
