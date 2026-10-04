import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock } from 'lucide-react';

interface RefreshIndicatorProps {
  onRefresh: () => void;
  isRefetching?: boolean;
  intervalSeconds?: number;
  lastUpdated?: string;
}

export const RefreshIndicator: React.FC<RefreshIndicatorProps> = ({
  onRefresh,
  isRefetching = false,
  intervalSeconds = 60,
  lastUpdated,
}) => {
  const [countdown, setCountdown] = useState(intervalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onRefresh();
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onRefresh, intervalSeconds]);

  const handleManualClick = () => {
    onRefresh();
    setCountdown(intervalSeconds);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0B1626] border border-[#1E2D45] rounded-xl px-4 py-2.5 text-xs text-slate-300">
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-[#2F80ED]" />
        <span>
          Auto-refresh in <span className="font-mono font-bold text-white">{countdown}s</span>
        </span>
        {lastUpdated && (
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            • Last update: {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleManualClick}
        disabled={isRefetching}
        className="px-3 py-1 rounded-lg bg-[#122035] hover:bg-[#122035]/80 text-[#2F80ED] border border-[#2F80ED]/30 font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
        <span>Refresh Now</span>
      </button>
    </div>
  );
};
