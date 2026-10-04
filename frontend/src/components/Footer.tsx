import React from 'react';
import { Train, Shield, Cpu, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050C16] border-t border-[#1E2D45] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#E63946] flex items-center justify-center">
              <Train className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-wide">RAILETA</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Real-time Indian Railways live tracking, precise ETA estimation, station departure boards, PNR verification & seat availability intelligence.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">Core Services</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/track/12301" className="hover:text-white transition-colors">Live Train Tracking</a></li>
            <li><a href="/trains" className="hover:text-white transition-colors">Train Schedule Search</a></li>
            <li><a href="/station/NDLS" className="hover:text-white transition-colors">Live Station Board</a></li>
            <li><a href="/pnr" className="hover:text-white transition-colors">PNR Status Lookup</a></li>
            <li><a href="/availability" className="hover:text-white transition-colors">Seat Availability & Fare</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">System Architecture</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-[#2F80ED]" /> RailKit Express Engine</li>
            <li className="flex items-center gap-2"><RefreshCw className="w-3.5 h-3.5 text-[#16A34A]" /> In-Memory Smart Cache</li>
            <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#E63946]" /> Zero Key Leaks & Security</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-200 tracking-wider uppercase mb-4">Major Junctions</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {['NDLS', 'HWH', 'SBC', 'CSMT', 'MAS', 'ADI', 'BCT', 'PNBE', 'SC'].map((stn) => (
              <a
                key={stn}
                href={`/station/${stn}`}
                className="px-2.5 py-1 rounded bg-[#0B1626] border border-[#1E2D45] hover:border-[#2F80ED] text-slate-300 hover:text-white transition-colors"
              >
                {stn}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#1E2D45]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} RailETA. Production Railway Information System.</p>
        <p className="mt-2 sm:mt-0">Powered by official RailKit Engine & Normalized API</p>
      </div>
    </footer>
  );
};
