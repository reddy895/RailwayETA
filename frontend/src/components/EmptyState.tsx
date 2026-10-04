import React from 'react';
import { Train, Search, MapPin, Ticket } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'train' | 'search' | 'station' | 'ticket';
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'train',
  actionText,
  onAction,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <Search className="w-8 h-8 text-[#2F80ED]" />;
      case 'station':
        return <MapPin className="w-8 h-8 text-[#F59E0B]" />;
      case 'ticket':
        return <Ticket className="w-8 h-8 text-[#16A34A]" />;
      default:
        return <Train className="w-8 h-8 text-[#E63946]" />;
    }
  };

  return (
    <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xl">
      <div className="w-16 h-16 rounded-full bg-[#122035] border border-[#1E2D45] flex items-center justify-center mx-auto">
        {renderIcon()}
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">{description}</p>
      </div>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl bg-[#2F80ED] hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
