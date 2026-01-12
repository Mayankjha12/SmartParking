import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  ParkingCircle,
  AlertTriangle,
  Users,
  User,
} from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-screen w-64 bg-[#1e2f4f] text-white flex flex-col">

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">
          SmartParking MCD
        </h1>
        <p className="text-xs text-white/60">
          Capacity Enforcement System
        </p>
      </div>

      {/* NAV LINKS */}
      <div className="flex-1 py-4 space-y-1">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-2 text-sm hover:bg-white/10 ${
              isActive ? "bg-white/20 font-semibold" : ""
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/live"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-2 text-sm hover:bg-white/10 ${
              isActive ? "bg-white/20 font-semibold" : ""
            }`
          }
        >
          <Video size={18} />
          Live Monitoring
        </NavLink>

        <NavLink
          to="/parking-lots"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-2 text-sm hover:bg-white/10 ${
              isActive ? "bg-white/20 font-semibold" : ""
            }`
          }
        >
          <ParkingCircle size={18} />
          Parking Lots
        </NavLink>

        <NavLink
          to="/violations"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-2 text-sm hover:bg-white/10 ${
              isActive ? "bg-white/20 font-semibold" : ""
            }`
          }
        >
          <AlertTriangle size={18} />
          Violations
        </NavLink>

        <NavLink
          to="/contractors"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-2 text-sm hover:bg-white/10 ${
              isActive ? "bg-white/20 font-semibold" : ""
            }`
          }
        >
          <Users size={18} />
          Contractors
        </NavLink>

      </div>

      {/* FOOTER / USER */}
      <div className="px-6 py-4 border-t border-white/10 flex items-center gap-3">
        <User size={18} />
        <div>
          <p className="text-sm font-medium">MCD Admin</p>
          <p className="text-xs text-white/60">Control Panel</p>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
