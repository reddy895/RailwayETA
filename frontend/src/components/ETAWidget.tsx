import React from 'react';
import { Clock, Navigation, AlertTriangle, CheckCircle } from 'lucide-react';

interface ETAWidgetProps {
  etaMinutes?: number;
  expectedTime?: string;
  nextStation: string;
  delayMinutes: number;
}

export const ETAWidget: React.FC<ETAWidgetProps> = ({
  etaMinutes,
  expectedTime,
  nextStation,
  delayMinutes,
}) => {
  return (
    <div className="bg-[#0B1626] border border-[#2F80ED]/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#2F80ED]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#2F80ED]" />
            Next Stop: <span className="text-white">{nextStation}</span>
          </span>

          <div className="flex items-baseline gap-3">
            {etaMinutes !== undefined && etaMinutes > 0 ? (
              <>
                <span className="text-4xl font-black text-white font-mono">{etaMinutes}</span>
                <span className="text-sm font-bold text-[#2F80ED]">MINS</span>
              </>
            ) : (
              <span className="text-2xl font-bold text-slate-400">ETA Unavailable</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end space-y-1">
          {expectedTime && (
            <div className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
              Expected Arrival: <span className="font-mono text-white text-sm font-bold">{expectedTime}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            {delayMinutes > 0 ? (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                +{delayMinutes} min delay
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Running On-Time
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
