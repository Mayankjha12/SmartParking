import React from 'react';
import { LayoutDashboard, Video, MapPin, AlertTriangle, Users, Bell } from 'lucide-react';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live Monitoring', icon: Video },
    { id: 'lots', label: 'Parking Lots', icon: MapPin },
    { id: 'violations', label: 'Violations', icon: AlertTriangle },
    { id: 'contractors', label: 'Contractors', icon: Users },
  ];

  return (
    <nav className="bg-[#1e4e8c] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-1 rounded">
             <div className="w-8 h-8 bg-blue-800 rounded-sm flex items-center justify-center font-bold text-white text-xs">MCD</div>
          </div>
          <span className="font-bold text-lg tracking-tight uppercase">Smart Parking <span className="text-blue-300 font-light text-sm">Enforcement</span></span>
        </div>
        
        <div className="flex space-x-2 h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center space-x-2 px-4 transition-all duration-200 text-sm font-medium
                ${activePage === item.id ? 'bg-[#153a6b] border-b-4 border-yellow-400' : 'hover:bg-white/10 opacity-80'}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <Bell size={20} className="cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </div>
          <div className="flex items-center space-x-2 border-l border-blue-400 pl-4">
            <div className="text-right">
              <p className="text-xs font-bold leading-none">Admin User</p>
              <p className="text-[10px] text-blue-200 leading-none mt-1">MCD-Internal</p>
            </div>
            <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/20">AD</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;