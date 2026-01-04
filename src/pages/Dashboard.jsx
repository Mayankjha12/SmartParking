import React, { useEffect, useState } from "react";
import { RefreshCw, ShieldCheck, Database, AlertTriangle } from "lucide-react";

const initialData = [
  { id: 1, name: "Sector 17 Plaza", zone: "Zone A", allowed: 150, current: 142, contractor: "ABC Parking Pvt. Ltd." },
  { id: 2, name: "City Center Mall", zone: "Zone B", allowed: 300, current: 315, contractor: "Metro Park Solutions" },
  { id: 3, name: "Railway Station (East)", zone: "Zone A", allowed: 200, current: 156, contractor: "City Parkings Ltd." },
  { id: 4, name: "Bus Terminal", zone: "Zone C", allowed: 100, current: 78, contractor: "ABC Parking Pvt. Ltd." },
  { id: 5, name: "Sarojini Nagar Market", zone: "Zone B", allowed: 80, current: 85, contractor: "Green Park Services" },
  { id: 6, name: "Lajpat Nagar Complex", zone: "Zone C", allowed: 120, current: 98, contractor: "Metro Park Solutions" },
  { id: 7, name: "Nehru Place IT Hub", zone: "Zone A", allowed: 250, current: 248, contractor: "City Parkings Ltd." },
  { id: 8, name: "Connaught Place Block A", zone: "Zone A", allowed: 180, current: 165, contractor: "ABC Parking Pvt. Ltd." },
];

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [lastSynced, setLastSynced] = useState(
    new Date().toLocaleString()
  );

  useEffect(() => {
    setData(
      initialData.map((d) => ({
        ...d,
        updated: new Date().toLocaleString(),
      }))
    );

    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((d) => {
          const fluctuation = Math.floor(Math.random() * 6) - 3;
          const newCurrent = Math.max(0, d.current + fluctuation);
          const excess = newCurrent - d.allowed;

          let status = "NORMAL";
          let sc = "bg-green-100 text-green-600";

          if (excess > 0) {
            status = "OVER CAPACITY";
            sc = "bg-red-100 text-red-600";
          } else if (excess > -10) {
            status = "NEAR FULL";
            sc = "bg-orange-100 text-orange-600";
          }

          return {
            ...d,
            current: newCurrent,
            excess,
            status,
            sc,
            updated: new Date().toLocaleString(),
          };
        })
      );

      setLastSynced(new Date().toLocaleString());
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const activeLots = 24;
  const activeViolations = data.filter((d) => d.excess > 0).length;

  return (
    <div className="bg-slate-100 min-h-screen p-6 space-y-6">
      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-6 py-3 flex justify-between items-center rounded">
        <h2 className="font-semibold tracking-wide">
          MCD SMART PARKING CAPACITY ENFORCEMENT SYSTEM
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw size={14} />
          Last Synced: {lastSynced}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold">{activeLots}</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL ACTIVE PARKING LOTS
          </p>
        </div>
        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold text-red-600">
            {activeViolations}
          </p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            ACTIVE VIOLATIONS
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <div className="bg-[#4a74b3] text-white px-4 py-2 font-semibold">
          PARKING LOTS STATUS – REAL TIME CCTV MONITORING
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-3 text-left">S.No.</th>
              <th className="p-3 text-left">Parking Lot Name</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Allowed Capacity</th>
              <th className="p-3">Current Occupancy</th>
              <th className="p-3">Excess Vehicles (+/-)</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-left">Contractor</th>
              <th className="p-3">Last Updated</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((d, i) => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{d.name}</td>
                <td className="p-3 text-center">{d.zone}</td>
                <td className="p-3 text-center">{d.allowed}</td>
                <td className="p-3 text-center font-semibold">{d.current}</td>
                <td
                  className={`p-3 text-center font-semibold ${
                    d.excess > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {d.excess > 0 ? `+${d.excess}` : d.excess}
                </td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${d.sc}`}>
                    {d.status}
                  </span>
                </td>
                <td className="p-3">{d.contractor}</td>
                <td className="p-3 text-xs">{d.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500 flex justify-between">
          <span>Showing 8 of 24 parking lots</span>
          <span>
            Data source: AI-powered CCTV Vehicle Detection | Auto-refresh: 5 min
          </span>
        </div>
      </div>

      {/* DATA INTEGRITY */}
      <div className="bg-white border rounded">
        <div className="bg-[#4a74b3] text-white px-4 py-2 font-semibold flex items-center gap-2">
          <ShieldCheck size={16} /> DATA INTEGRITY & ACCOUNTABILITY
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-sm text-slate-600">
          <div className="flex gap-3">
            <Database className="text-blue-600" />
            <div>
              <p className="font-semibold">Tamper-Proof Records</p>
              <p>
                All data sourced directly from CCTV feeds with auto time-stamps
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <ShieldCheck className="text-blue-600" />
            <div>
              <p className="font-semibold">Centralized MCD Database</p>
              <p>
                Read-only access for contractors | Full audit trail maintained
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertTriangle className="text-orange-500" />
            <div>
              <p className="font-semibold">AI Enforcement</p>
              <p>
                AI Vehicle Detection | Over-parking Detection | Recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
