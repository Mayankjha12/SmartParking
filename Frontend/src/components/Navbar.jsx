import React, { useState } from "react";
import {
  LayoutDashboard,
  Video,
  MapPin,
  AlertTriangle,
  Users,
  Bell,
  Menu,
  X,
} from "lucide-react";

import HNLogo from "../assets/hn-logo.png";

const Navbar = ({ activePage, setActivePage }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "live", label: "Live Monitoring", icon: Video },
    { id: "lots", label: "Parking Lots", icon: MapPin },
    { id: "violations", label: "Violations", icon: AlertTriangle },
    { id: "contractors", label: "Contractors", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 px-4 pt-4">
      <div className="backdrop-blur-xl bg-white/80 border border-slate-200 shadow-lg rounded-2xl">

        <div className="h-16 px-6 flex justify-between items-center">

          {/* LEFT – LOGO */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-white shadow ring-1 ring-slate-300 overflow-hidden">
              <img
                src={HNLogo}
                alt="H-N Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="leading-tight">
              <p className="font-semibold text-[15px] text-slate-900">
                Smart Parking
              </p>
              <p className="text-[10px] text-slate-500 tracking-[0.3em] uppercase">
                Enforcement System
              </p>
            </div>
          </div>

          {/* DESKTOP NAV – CLEAN TAB STYLE */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`relative flex items-center gap-2 pb-2 text-sm font-medium tracking-wide transition-all duration-300
                    ${
                      active
                        ? "text-blue-700"
                        : "text-slate-600 hover:text-blue-600"
                    }`}
                >
                  <Icon size={16} />
                  {item.label}

                  {/* UNDERLINE INDICATOR */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transition-all duration-300
                      ${
                        active
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT – ADMIN */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative cursor-pointer">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 flex items-center justify-center rounded-full text-white">
                3
              </span>
            </div>

            <div className="flex items-center gap-3 pl-5 border-l border-slate-300">
              <div className="text-right leading-tight">
                <p className="text-xs font-semibold text-slate-800">
                  Admin User
                </p>
                <p className="text-[10px] text-slate-500 tracking-wider">
                  MCD INTERNAL
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-sm font-bold shadow">
                AD
              </div>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-slate-200 px-4 pb-4">
            <div className="mt-3 bg-white rounded-xl shadow overflow-hidden">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition
                      ${
                        active
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;