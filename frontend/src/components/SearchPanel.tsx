import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRightLeft, Navigation, Ticket, Building2 } from 'lucide-react';

export const SearchPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'journey' | 'track' | 'pnr' | 'station'>('journey');

  // Journey search state
  const [fromStation, setFromStation] = useState('NDLS');
  const [toStation, setToStation] = useState('HWH');
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);

  // Track train state
  const [trainNo, setTrainNo] = useState('12301');

  // PNR state
  const [pnrInput, setPnrInput] = useState('');

  // Station board state
  const [stationCodeInput, setStationCodeInput] = useState('SBC');

  const handleSwapStations = () => {
    setFromStation(toStation);
    setToStation(fromStation);
  };

  const handleJourneySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStation && toStation) {
      navigate(`/trains?from=${fromStation.toUpperCase()}&to=${toStation.toUpperCase()}&date=${journeyDate}`);
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trainNo) {
      navigate(`/track/${trainNo.trim()}`);
    }
  };

  const handlePnrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pnrInput) {
      navigate(`/pnr?pnr=${pnrInput.trim()}`);
    }
  };

  const handleStationBoardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stationCodeInput) {
      navigate(`/station/${stationCodeInput.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="w-full bg-[#0B1626] border border-[#1E2D45] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Search Tabs */}
      <div className="grid grid-cols-4 border-b border-[#1E2D45] bg-[#07111F]/50">
        <button
          type="button"
          onClick={() => setActiveTab('journey')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'journey'
              ? 'border-[#E63946] text-white bg-[#0B1626]'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1626]/50'
          }`}
        >
          <Search className="w-4 h-4 text-[#E63946]" />
          <span>Train Search</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('track')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'track'
              ? 'border-[#2F80ED] text-white bg-[#0B1626]'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1626]/50'
          }`}
        >
          <Navigation className="w-4 h-4 text-[#2F80ED]" />
          <span>Track Live</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pnr')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'pnr'
              ? 'border-[#16A34A] text-white bg-[#0B1626]'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1626]/50'
          }`}
        >
          <Ticket className="w-4 h-4 text-[#16A34A]" />
          <span>Check PNR</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('station')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'station'
              ? 'border-[#F59E0B] text-white bg-[#0B1626]'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#0B1626]/50'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#F59E0B]" />
          <span>Station Board</span>
        </button>
      </div>

      {/* Tab 1: Journey Search */}
      {activeTab === 'journey' && (
        <form onSubmit={handleJourneySearch} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4 relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2F80ED]" /> From Station
              </label>
              <input
                type="text"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                placeholder="e.g. NDLS or New Delhi"
                className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-3 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors uppercase"
                required
              />
            </div>

            <div className="md:col-span-1 flex items-center justify-center">
              <button
                type="button"
                onClick={handleSwapStations}
                className="w-10 h-10 rounded-full bg-[#122035] border border-[#1E2D45] hover:border-[#2F80ED] text-slate-300 hover:text-white flex items-center justify-center transition-transform hover:rotate-180 duration-300"
                title="Swap stations"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="md:col-span-4 relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E63946]" /> To Station
              </label>
              <input
                type="text"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                placeholder="e.g. HWH or Howrah"
                className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#E63946] rounded-xl px-4 py-3 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors uppercase"
                required
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#16A34A]" /> Date
              </label>
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full bg-[#122035] border border-[#1E2D45] focus:border-[#16A34A] rounded-xl px-3.5 py-3 text-white font-medium focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#B91C1C] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#E63946]/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              SEARCH TRAINS
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Track Live Train */}
      {activeTab === 'track' && (
        <form onSubmit={handleTrackSubmit} className="p-6">
          <div className="max-w-xl mx-auto">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#2F80ED]" /> Train Number or Name
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trainNo}
                onChange={(e) => setTrainNo(e.target.value)}
                placeholder="Enter 5-digit Train No (e.g. 12301 or 12627)"
                className="flex-1 bg-[#122035] border border-[#1E2D45] focus:border-[#2F80ED] rounded-xl px-4 py-3 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#2F80ED] hover:bg-blue-600 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                TRACK LIVE
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 3: PNR Status */}
      {activeTab === 'pnr' && (
        <form onSubmit={handlePnrSubmit} className="p-6">
          <div className="max-w-xl mx-auto">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Ticket className="w-3.5 h-3.5 text-[#16A34A]" /> 10-Digit PNR Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                maxLength={10}
                placeholder="e.g. 8412948210"
                className="flex-1 bg-[#122035] border border-[#1E2D45] focus:border-[#16A34A] rounded-xl px-4 py-3 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors tracking-widest font-mono"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#16A34A] hover:bg-green-600 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                CHECK STATUS
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Tab 4: Station Live Board */}
      {activeTab === 'station' && (
        <form onSubmit={handleStationBoardSubmit} className="p-6">
          <div className="max-w-xl mx-auto">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" /> Station Code
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={stationCodeInput}
                onChange={(e) => setStationCodeInput(e.target.value)}
                placeholder="Enter Station Code (e.g. SBC, NDLS, HWH)"
                className="flex-1 bg-[#122035] border border-[#1E2D45] focus:border-[#F59E0B] rounded-xl px-4 py-3 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors uppercase"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                VIEW BOARD
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
