import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStationBoard } from '../hooks/useRailway';
import { StationBoard } from '../components/StationBoard';
import { Building2, Search, RefreshCw, AlertCircle } from 'lucide-react';

export const StationBoardPage: React.FC = () => {
  const { stationCode: paramCode } = useParams();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState(paramCode || 'SBC');
  const [activeCode, setActiveCode] = useState(paramCode || 'SBC');
  const [hours, setHours] = useState<2 | 4 | 8>(4);

  const { data: boardData, isLoading, isError, error, refetch } = useStationBoard(activeCode, hours);

  useEffect(() => {
    if (paramCode) {
      setActiveCode(paramCode.toUpperCase());
      setInputCode(paramCode.toUpperCase());
    }
  }, [paramCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      const code = inputCode.trim().toUpperCase();
      setActiveCode(code);
      navigate(`/station/${code}`);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Top Search Bar */}
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
              Station Code or Junction Name
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. SBC, NDLS, HWH, CSMT"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-white font-medium uppercase focus:outline-none"
              required
            />
          </div>

          <div className="w-full sm:w-auto">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Time Window
            </label>
            <select
              value={hours}
              onChange={(e) => setHours(Number(e.target.value) as 2 | 4 | 8)}
              className="w-full bg-[#122035] border border-[#1E2D45] text-white text-sm font-semibold rounded-xl px-4 py-3 focus:outline-none"
            >
              <option value={2}>Next 2 Hours</option>
              <option value={4}>Next 4 Hours</option>
              <option value={8}>Next 8 Hours</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 mt-auto rounded-xl bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#F59E0B]/20 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            SEARCH BOARD
          </button>
        </form>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-8 animate-pulse space-y-4">
          <div className="h-6 bg-[#122035] rounded w-1/3"></div>
          <div className="h-12 bg-[#122035] rounded w-full"></div>
          <div className="h-48 bg-[#122035] rounded w-full"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Station Board Unavailable</h3>
          <p className="text-xs text-slate-400">
            {(error as Error)?.message || `Station code ${activeCode} was not recognized or live board is temporarily unavailable.`}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-white text-xs font-bold border border-[#1E2D45] inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-[#F59E0B]" />
            Retry
          </button>
        </div>
      )}

      {/* Live Board Data */}
      {boardData && (
        <StationBoard
          entries={boardData.trains || []}
          stationCode={boardData.stationCode}
          stationName={boardData.stationName}
        />
      )}
    </div>
  );
};
