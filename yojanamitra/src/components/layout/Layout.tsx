import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-[#1e3a5f] text-white/70 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2026 YojanaMitra · SIH Project · Built for marginalized entrepreneurs</p>
          <p className="flex items-center gap-1">
            <span className="text-saffron-400">●</span> AI-Assisted · Deterministic Eligibility Rules
          </p>
        </div>
      </footer>
    </div>
  );
}
