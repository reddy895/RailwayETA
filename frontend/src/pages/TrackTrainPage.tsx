import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveTrain } from '../hooks/useRailway';
import { ETAWidget } from '../components/ETAWidget';
import { RailwayTimeline } from '../components/RailwayTimeline';
import { Navigation, RefreshCw, AlertCircle, Radio, Search } from 'lucide-react';

export const TrackTrainPage: React.FC = () => {
  const { trainNumber: paramTrain } = useParams();
  const navigate = useNavigate();

  const [inputTrain, setInputTrain] = useState(paramTrain || '12301');
  const [activeTrainNumber, setActiveTrainNumber] = useState(paramTrain || '12301');
  const [countdown, setCountdown] = useState(60);

  const { data: liveData, isLoading, isError, error, refetch, isRefetching } = useLiveTrain(activeTrainNumber);

  // Sync parameter changes
  useEffect(() => {
    if (paramTrain) {
      setActiveTrainNumber(paramTrain);
      setInputTrain(paramTrain);
    }
  }, [paramTrain]);

  // 60-second auto-refresh countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refetch();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTrain) {
      setActiveTrainNumber(inputTrain.trim());
      navigate(`/track/${inputTrain.trim()}`);
    }
  };

  const handleManualRefresh = () => {
    refetch();
    setCountdown(60);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Top Search Bar for Live Tracking */}
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full relative">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#2F80ED]" />
              Enter Train Number or Name
            </label>
            <input
              type="text"
              value={inputTrain}
              onChange={(e) => setInputTrain(e.target.value)}
              placeholder="e.g. 12301, 12627 or Rajdhani"
              className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-3 text-white font-medium focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 mt-auto rounded-xl bg-[#2F80ED] hover:bg-blue-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#2F80ED]/20 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            TRACK LIVE
          </button>
        </form>
      </div>

      {/* Main Header & Live Running Status */}
      {liveData && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#1E2D45] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-[#E63946] text-white font-mono font-black text-sm">
                  #{liveData.trainNumber}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#122035] text-slate-300 text-xs font-semibold uppercase border border-[#1E2D45]">
                  {liveData.trainType || 'EXPRESS'}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 text-xs font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  LIVE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                {liveData.trainName}
              </h1>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {liveData.source} → {liveData.destination}
              </p>
            </div>

            {/* Refresh Controls & Telemetry Info */}
            <div className="flex flex-col items-start lg:items-end space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  Auto-refresh in <span className="text-white font-bold">{countdown}s</span>
                </span>
                <button
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={isRefetching}
                  className="px-3.5 py-1.5 rounded-lg bg-[#122035] hover:bg-[#122035]/80 text-[#2F80ED] border border-[#2F80ED]/30 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
                  Refresh Now
                </button>
              </div>
              <span className="text-[11px] text-slate-500">
                Last successful update: {new Date(liveData.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Current Position & Next Stop Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#122035]/70 border border-[#1E2D45]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Current Location
              </span>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#E63946] animate-pulse" />
                {liveData.currentStation}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#122035]/70 border border-[#1E2D45]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Upcoming Station
              </span>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2F80ED]" />
                {liveData.nextStation}
              </div>
            </div>
          </div>

          {/* Prominent ETA Calculation Widget */}
          <ETAWidget
            etaMinutes={liveData.etaNextStationMinutes}
            expectedTime={liveData.expectedNextArrival}
            nextStation={liveData.nextStation}
            delayMinutes={liveData.delayMinutes}
          />
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-8 animate-pulse space-y-6">
          <div className="h-6 bg-[#122035] rounded w-1/3"></div>
          <div className="h-10 bg-[#122035] rounded w-2/3"></div>
          <div className="h-32 bg-[#122035] rounded w-full"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Live Tracking Unavailable</h3>
          <p className="text-xs text-slate-400">
            {(error as Error)?.message || `We couldn't retrieve live running status for train #${activeTrainNumber}.`}
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-white text-xs font-bold border border-[#1E2D45] inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-[#2F80ED]" />
            Retry Tracking
          </button>
        </div>
      )}

      {/* Vertical Station Timeline */}
      {liveData && (
        <RailwayTimeline stations={liveData.stations || []} currentStationName={liveData.currentStation} />
      )}
    </div>
  );
};
