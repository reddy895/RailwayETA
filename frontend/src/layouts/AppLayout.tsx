import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col font-sans pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};
