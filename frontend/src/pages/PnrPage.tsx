import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePNR } from '../hooks/useRailway';
import { Ticket, Search, AlertCircle, RefreshCw, UserCheck } from 'lucide-react';

export const PnrPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [pnrInput, setPnrInput] = useState(searchParams.get('pnr') || '8412948210');
  const [activePnr, setActivePnr] = useState(searchParams.get('pnr') || '8412948210');

  const { data: pnrData, isLoading, isError, error, refetch } = usePNR(activePnr);

  useEffect(() => {
    const q = searchParams.get('pnr');
    if (q) {
      setActivePnr(q);
      setPnrInput(q);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnrInput && /^\d{10}$/.test(pnrInput.trim())) {
      const pnr = pnrInput.trim();
      setActivePnr(pnr);
      setSearchParams({ pnr });
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Search Header Banner */}
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl max-w-2xl mx-auto">
        <h1 className="text-2xl font-black text-white tracking-wide uppercase mb-4 flex items-center gap-2">
          <Ticket className="w-6 h-6 text-[#16A34A]" />
          PNR Status Enquiry
        </h1>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Enter 10-Digit PNR Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                maxLength={10}
                placeholder="e.g. 8412948210"
                className="flex-1 bg-[#122035] border border-[#1E2D45] focus:border-[#16A34A] rounded-xl px-4 py-3 text-white font-mono font-bold tracking-widest placeholder-slate-500 focus:outline-none text-lg"
                required
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#16A34A] hover:bg-green-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#16A34A]/20 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                GET PNR STATUS
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-8 animate-pulse max-w-3xl mx-auto space-y-4">
          <div className="h-6 bg-[#122035] rounded w-1/3"></div>
          <div className="h-20 bg-[#122035] rounded w-full"></div>
          <div className="h-40 bg-[#122035] rounded w-full"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">PNR Lookup Failed</h3>
          <p className="text-xs text-slate-400">
            {(error as Error)?.message || `We couldn't retrieve PNR status for #${activePnr}. Verify 10-digit PNR.`}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-white text-xs font-bold border border-[#1E2D45] inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-[#16A34A]" />
            Try Again
          </button>
        </div>
      )}

      {/* PNR Status Display */}
      {pnrData && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6">
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1E2D45] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#16A34A] text-white font-mono font-bold text-xs tracking-wider">
                  PNR #{pnrData.pnrNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#122035] text-slate-300 text-xs font-bold border border-[#1E2D45]">
                  Chart: {pnrData.chartStatus}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white">{pnrData.trainName} ({pnrData.trainNumber})</h2>
              <p className="text-xs text-slate-400 font-semibold uppercase">
                {pnrData.fromStation} → {pnrData.toStation} • Date: {pnrData.journeyDate}
              </p>
            </div>

            <div className="bg-[#122035] p-3 rounded-xl border border-[#1E2D45] text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px] uppercase">Class & Quota</span>
              <span className="text-white font-bold text-sm">{pnrData.class} | {pnrData.quota}</span>
            </div>
          </div>

          {/* Passenger Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#16A34A]" />
              Passenger Allotment Details
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E2D45] text-slate-400 uppercase tracking-wider font-bold">
                    <th className="pb-3 px-3">Passenger</th>
                    <th className="pb-3 px-3">Booking Status</th>
                    <th className="pb-3 px-3">Current Status</th>
                    <th className="pb-3 px-3">Coach</th>
                    <th className="pb-3 px-3 text-right">Berth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2D45]/60">
                  {pnrData.passengers.map((p) => (
                    <tr key={p.passengerNumber} className="hover:bg-[#122035]/30">
                      <td className="py-3 px-3 font-bold text-white">Passenger {p.passengerNumber}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">{p.bookingStatus}</td>
                      <td className="py-3 px-3">
                        <span className="px-2.5 py-1 rounded bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 font-bold font-mono">
                          {p.currentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white">{p.coach || 'B2'}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-white">
                        {p.berth} ({p.berthCode || 'Lower'})
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
