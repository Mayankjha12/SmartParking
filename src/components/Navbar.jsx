import React, { useState } from "react";
import {
  LayoutDashboard,
  Video,
  MapPin,
  AlertTriangle,
  Users,
  Bell,
  Menu,
  X
} from "lucide-react";

import HNLogo from "../assets/hn-logo.png";

const Navbar = ({ activePage, setActivePage }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "live", label: "Live Monitoring", icon: Video },
    { id: "lots", label: "Parking Lots", icon: MapPin },
    { id: "violations", label: "Violations", icon: AlertTriangle },
    { id: "contractors", label: "Contractors", icon: Users }
  ];

  return (
    <nav className="bg-[#1e4e8c] text-white shadow-md sticky top-0 z-50">
      <div className="w-full px-4 md:px-6 flex justify-between items-center h-16">

        {/* LEFT – LOGO */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded">
            <img
              src={HNLogo}
              alt="H-N Logo"
              className="w-8 h-8 object-contain"
            />
          </div>

          <div className="leading-tight">
            <p className="font-bold text-sm uppercase">Smart Parking</p>
            <p className="text-[10px] text-blue-200 tracking-wide">
              Enforcement System
            </p>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-2 px-4 text-sm font-medium transition-all
                ${
                  activePage === item.id
                    ? "bg-[#153a6b] border-b-4 border-yellow-400"
                    : "hover:bg-white/10 opacity-80"
                }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT – ADMIN (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          <div className="flex items-center gap-3 border-l border-blue-400 pl-4">
            <div className="text-right">
              <p className="text-xs font-semibold">Admin User</p>
              <p className="text-[10px] text-blue-200">MCD Internal</p>
            </div>
            <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold text-black">
              AD
            </div>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-[#153a6b] border-t border-blue-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm
                ${
                  activePage === item.id
                    ? "bg-[#102f5a]"
                    : "hover:bg-white/10"
                }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
