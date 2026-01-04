import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import ParkingLots from './pages/ParkingLots';
import Violations from './pages/Violations';
import Contractors from './pages/Contractors';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  // Function to switch between pages
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'live':
        return <LiveMonitoring />;
      case 'lots':
        return <ParkingLots />;
      case 'violations':
        return <Violations />;
      case 'contractors':
        return <Contractors />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main className="flex-grow overflow-x-hidden">
        {renderPage()}
      </main>

      {/* Blue Footer Info Bar (Image 9) */}
      <footer className="bg-[#1e4e8c] text-white p-4 mt-auto border-t border-blue-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around text-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">🗄️</div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase leading-none">Tamper-Proof Records</p>
              <p className="text-[9px] opacity-70">Sourced directly from CCTV feeds</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">🛡️</div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase leading-none">Centralized MCD Database</p>
              <p className="text-[9px] opacity-70">Full audit trail maintained</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">⚠️</div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase leading-none">AI Enforcement</p>
              <p className="text-[9px] opacity-70">Automated violation detection</p>
            </div>
          </div>
        </div>
        <div className="text-center text-[9px] mt-4 opacity-50 uppercase tracking-widest font-bold">
          Municipal Corporation of Delhi | Smart Parking Capacity Enforcement System | For Official Use Only
        </div>
      </footer>
    </div>
  );
}

export default App;