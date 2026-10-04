import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Railway Service Unavailable',
  message,
  onRetry,
}) => {
  return (
    <div className="bg-[#0B1626] border border-[#DC2626]/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4 shadow-xl">
      <div className="w-12 h-12 rounded-full bg-[#DC2626]/20 text-[#DC2626] flex items-center justify-center mx-auto">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-2.5 rounded-xl bg-[#122035] hover:bg-[#122035]/80 text-white text-xs font-bold border border-[#1E2D45] inline-flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-[#2F80ED]" />
          Retry Request
        </button>
      )}
    </div>
  );
};
