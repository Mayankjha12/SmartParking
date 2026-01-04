import React from "react";
import { Video, CheckCircle, WifiOff, RefreshCw, Camera } from "lucide-react";

const LiveMonitoring = () => {
  const cameraListData = [
    { name: "Sector 17 Plaza - Entry Gate", count: "142 / 150", status: "ONLINE", color: "green", time: "03-01-2026 14:32:15" },
    { name: "City Center Mall - Level 1", count: "165 / 150", status: "VIOLATION", color: "red", time: "03-01-2026 14:30:42" },
    { name: "City Center Mall - Level 2", count: "150 / 150", status: "ONLINE", color: "green", time: "03-01-2026 14:30:38" },
    { name: "Railway Station - Main Entry", count: "156 / 200", status: "ONLINE", color: "green", time: "03-01-2026 14:28:33" },
    { name: "Bus Terminal - North Gate", count: "---", status: "OFFLINE", color: "gray", time: "03-01-2026 12:15:00" },
    { name: "Sarojini Nagar - Main Entry", count: "85 / 80", status: "VIOLATION", color: "red", time: "03-01-2026 14:22:56" },
    { name: "Nehru Place - Block A Entry", count: "248 / 250", status: "ONLINE", color: "green", time: "03-01-2026 14:18:44" },
    { name: "Connaught Place - Block A", count: "165 / 180", status: "ONLINE", color: "green", time: "03-01-2026 14:15:22" },
  ];

  return (
    <div className="bg-slate-100 min-h-screen p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-6 py-3 flex justify-between items-center rounded">
        <h2 className="font-semibold tracking-wide">
          LIVE CCTV MONITORING – AI VEHICLE DETECTION
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw size={14} />
          Last Synced: 04/01/2026, 06:07 pm
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-3xl font-semibold">7</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            CAMERAS ONLINE
          </p>
        </div>
        <div className="bg-white border p-6 text-center">
          <WifiOff className="mx-auto text-red-600 mb-2" size={22} />
          <p className="text-3xl font-semibold text-red-600">1</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            CAMERAS OFFLINE
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-6">

        {/* LEFT – CCTV FEED */}
        <div className="col-span-8 bg-white border rounded overflow-hidden">
          <div className="bg-[#4a74b3] text-white px-4 py-2 flex justify-between items-center text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Video size={14} /> Sector 17 Plaza – Entry Gate
            </span>
            <span className="text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span> LIVE
            </span>
          </div>

          <div className="h-[360px] bg-slate-50 flex flex-col items-center justify-center">
            <Video size={48} className="text-slate-300 mb-2" />
            <p className="text-slate-400 text-sm">CCTV Feed Placeholder</p>
          </div>

          {/* BOTTOM STATS */}
          <div className="grid grid-cols-3 border-t text-center">
            <div className="p-4">
              <p className="text-xs text-slate-500 uppercase">Current Count</p>
              <p className="text-2xl font-semibold">142</p>
            </div>
            <div className="p-4 border-l border-r">
              <p className="text-xs text-slate-500 uppercase">Allowed Capacity</p>
              <p className="text-2xl font-semibold">150</p>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-500 uppercase">Status</p>
              <p className="text-2xl font-semibold text-green-600">NORMAL</p>
            </div>
          </div>

          <div className="bg-slate-50 px-4 py-2 text-xs text-slate-500 flex justify-between">
            <span>Last Frame Update: 03-01-2026 14:32:15</span>
            <span>AI Processing: Real-time</span>
          </div>
        </div>

        {/* RIGHT – CAMERA LIST */}
        <div className="col-span-4 bg-white border rounded overflow-hidden">
          <div className="bg-[#4a74b3] text-white px-4 py-2 font-semibold">
            CAMERA LIST
          </div>

          <div className="flex justify-between px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
            <span>Camera</span>
            <span>Status</span>
          </div>

          <div className="divide-y max-h-[520px] overflow-y-auto">
            {cameraListData.map((cam, i) => (
              <div key={i} className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{cam.name}</p>

                    {/* CAMERA ICON + COUNT */}
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Camera size={12} className="text-slate-400" />
                      <span>{cam.count}</span>
                    </div>

                    <p className="text-[11px] text-slate-400">{cam.time}</p>
                  </div>

                  <span
                    className={`h-fit px-2 py-0.5 text-xs font-semibold rounded
                    ${
                      cam.color === "green"
                        ? "bg-green-100 text-green-600"
                        : cam.color === "red"
                        ? "bg-red-100 text-red-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {cam.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-slate-500">
        Municipal Corporation of Delhi | Live CCTV Monitoring Module | For Official Use Only
      </div>
    </div>
  );
};

export default LiveMonitoring;