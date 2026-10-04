import React from 'react';
import { useParams } from 'react-router-dom';
import { useTrainDetails } from '../hooks/useRailway';
import { TrainHeader } from '../components/TrainHeader';
import { MapPin, RefreshCw, AlertCircle } from 'lucide-react';

export const TrainDetailsPage: React.FC = () => {
  const { trainNumber } = useParams();
  const targetTrain = trainNumber || '12301';

  const { data: train, isLoading, isError, error, refetch } = useTrainDetails(targetTrain);

  return (
    <div className="space-y-8 py-4">
      {/* Loading State */}
      {isLoading && (
        <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-8 animate-pulse space-y-6">
          <div className="h-6 bg-[#122035] rounded w-1/3"></div>
          <div className="h-10 bg-[#122035] rounded w-2/3"></div>
          <div className="h-48 bg-[#122035] rounded w-full"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Train Schedule Unavailable</h3>
          <p className="text-xs text-slate-400">
            {(error as Error)?.message || `We couldn't retrieve schedule information for train #${targetTrain}.`}
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

      {/* Train Details Content */}
      {train && (
        <>
          <TrainHeader train={train} />

          {/* Full Timetable Route Table */}
          <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E2D45] pb-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide uppercase flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#2F80ED]" />
                  Full Train Schedule & Route Timetable
                </h2>
                <p className="text-xs text-slate-400">Station list, arrival, departure & distance breakdown</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#1E2D45] text-slate-400 uppercase tracking-wider font-bold">
                    <th className="pb-3 px-3">#</th>
                    <th className="pb-3 px-3">Station</th>
                    <th className="pb-3 px-3">Arr Time</th>
                    <th className="pb-3 px-3">Dep Time</th>
                    <th className="pb-3 px-3">Halt</th>
                    <th className="pb-3 px-3">Distance</th>
                    <th className="pb-3 px-3">Day</th>
                    <th className="pb-3 px-3 text-right">PF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2D45]/60">
                  {train.stations?.map((stop, idx) => (
                    <tr key={stop.stationCode || idx} className="hover:bg-[#122035]/40 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-500 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#122035] text-slate-200 border border-[#1E2D45]">
                            {stop.stationCode}
                          </span>
                          <span className="font-bold text-white text-sm">{stop.stationName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-200">{stop.arrivalTime}</td>
                      <td className="py-3 px-3 font-mono text-slate-200">{stop.departureTime}</td>
                      <td className="py-3 px-3 font-mono text-slate-400">{stop.haltTime || '2m'}</td>
                      <td className="py-3 px-3 font-mono text-slate-400">{stop.distance} km</td>
                      <td className="py-3 px-3 font-mono text-slate-400">Day {stop.day || 1}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-300">
                        PF {stop.platform || '1'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
