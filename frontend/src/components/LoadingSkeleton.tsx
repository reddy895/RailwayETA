import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'timeline' | 'table';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 3 }) => {
  if (type === 'table') {
    return (
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-[#122035] rounded w-1/4"></div>
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-10 bg-[#122035]/60 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'timeline') {
    return (
      <div className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 space-y-6 animate-pulse">
        <div className="h-6 bg-[#122035] rounded w-1/3"></div>
        <div className="space-y-6 pl-4 border-l-2 border-[#1E2D45]">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-12 bg-[#122035]/60 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0B1626] border border-[#1E2D45] rounded-2xl p-6 space-y-4 animate-pulse">
          <div className="flex justify-between">
            <div className="h-4 bg-[#122035] rounded w-1/4"></div>
            <div className="h-4 bg-[#122035] rounded w-1/6"></div>
          </div>
          <div className="h-8 bg-[#122035] rounded w-1/2"></div>
          <div className="h-10 bg-[#122035]/60 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};
