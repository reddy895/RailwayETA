import React from 'react';
import { StationStop } from '../types';
import { CheckCircle2, Radio, MapPin } from 'lucide-react';

interface RailwayTimelineProps {
  stations: StationStop[];
  currentStationName?: string;
}

export const RailwayTimeline: React.FC<RailwayTimelineProps> = ({ stations, currentStationName }) => {
  return (
    <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-[#1E2D45] pb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#E63946]" />
            Live Route Timeline & Station Stops
          </h3>
          <p className="text-xs text-slate-400">Station-by-station scheduled vs actual running status</p>
        </div>
        <span className="text-xs font-mono text-slate-500">
          {stations.length} Stops
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#2F80ED] via-[#16A34A] to-[#1E2D45]">
        {stations.map((stop, idx) => {
          const isCurrent = stop.isCurrent || stop.stationName === currentStationName;
          const isPassed = !isCurrent && (stop.actualDeparture || stop.actualArrival || idx === 0);

          return (
            <div key={stop.stationCode || idx} className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 group">
              {/* Station Node Indicator */}
              <div className="absolute -left-[31px] sm:-left-[35px] top-1 sm:top-auto bg-[#0B1626] p-1 rounded-full z-10">
                {isCurrent ? (
                  <div className="w-6 h-6 rounded-full bg-[#E63946] flex items-center justify-center animate-pulse shadow-lg shadow-[#E63946]/50">
                    <Radio className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : isPassed ? (
                  <div className="w-5 h-5 rounded-full bg-[#16A34A] flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-[#122035] border-2 border-[#1E2D45]"></div>
                )}
              </div>

              {/* Station Name & Info */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white tracking-wide">
                    {stop.stationName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#122035] text-slate-300 border border-[#1E2D45]">
                    {stop.stationCode}
                  </span>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#E63946] text-white animate-bounce">
                      CURRENT LOCATION
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>Day {stop.day || 1} • {stop.distance} km</span>
                  {stop.platform && (
                    <span className="text-slate-300 font-medium">PF {stop.platform}</span>
                  )}
                </div>
              </div>

              {/* Timings: Scheduled vs Actual */}
              <div className="flex items-center gap-4 bg-[#122035]/60 px-3.5 py-2 rounded-xl border border-[#1E2D45] text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Arr</span>
                  <span className="text-slate-300">{stop.arrivalTime}</span>
                  {stop.actualArrival && (
                    <span className="block text-[#16A34A] font-bold">{stop.actualArrival}</span>
                  )}
                </div>

                <div className="w-px h-6 bg-[#1E2D45]"></div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Dep</span>
                  <span className="text-slate-300">{stop.departureTime}</span>
                  {stop.actualDeparture && (
                    <span className="block text-[#16A34A] font-bold">{stop.actualDeparture}</span>
                  )}
                </div>

                {stop.delay && stop.delay > 0 ? (
                  <span className="ml-2 px-2 py-1 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-bold text-[10px]">
                    +{stop.delay}m
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
