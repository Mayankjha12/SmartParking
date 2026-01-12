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
  const [lastSynced, setLastSynced] = useState(new Date().toLocaleString());
  const [showDashboard, setShowDashboard] = useState(false);
  const [liveParking, setLiveParking] = useState(null);

  /* ---------- INIT + SIMULATION ---------- */
  useEffect(() => {
    setData(
      initialData.map((d) => ({
        ...d,
        excess: d.current - d.allowed,
        status: d.current > d.allowed ? "OVER CAPACITY" : "NORMAL",
        sc:
          d.current > d.allowed
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600",
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

  /* ---------- LIVE BACKEND DATA ---------- */
  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/parking");
        const apiData = await res.json();
        setLiveParking(apiData);
      } catch {
        console.log("Backend not reachable");
      }
    };

    fetchLive();
    const apiInterval = setInterval(fetchLive, 8000);
    return () => clearInterval(apiInterval);
  }, []);

  /* ---------- MERGE LIVE LOT ---------- */
  const mergedData = data.map((d) => {
    if (
      liveParking &&
      d.name.toLowerCase().includes("connaught place")
    ) {
      const excess =
        liveParking.currentCount - liveParking.capacity;

      return {
        ...d,
        allowed: liveParking.capacity,
        current: liveParking.currentCount,
        contractor: liveParking.contractor,
        excess,
        status: excess > 0 ? "OVER CAPACITY" : "NORMAL",
        sc:
          excess > 0
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600",
        updated: new Date().toLocaleString(),
      };
    }
    return d;
  });

  /* ---------- SCROLL ---------- */
  useEffect(() => {
    if (showDashboard) {
      setTimeout(() => {
        document
          .getElementById("dashboard-main")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showDashboard]);

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* HERO SECTION (UNCHANGED) */}
      <div
        className="relative h-[75vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506521781263-d8422e82f27a')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/20" />

        <div className="relative z-10 max-w-3xl px-10">
          <p className="text-sm uppercase tracking-widest text-blue-300 mb-3">
            Delhi Parking Problem
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            We can’t even count how many cars are parked.
          </h1>

          <p className="text-lg text-slate-200 mb-8">
            SmartParking MCD brings real-time slot detection and occupancy analytics
            for every parking lot.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setShowDashboard(true)}
              className="bg-[#4a74b3] hover:bg-[#3b5f94] text-white px-6 py-3 rounded font-semibold shadow-lg"
            >
              Open Dashboard
            </button>

            <button className="border border-white/70 text-white px-6 py-3 rounded font-semibold hover:bg-white/10">
              View Problem Statement
            </button>
          </div>
        </div>
      </div>

      {/* DASHBOARD */}
      {showDashboard && (
        <div id="dashboard-main" className="p-6 space-y-6">

          <div className="bg-[#4a74b3] text-white px-6 py-3 flex justify-between items-center rounded">
            <h2 className="font-semibold tracking-wide">
              MCD SMART PARKING CAPACITY ENFORCEMENT SYSTEM
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw size={14} />
              Last Synced: {lastSynced}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border p-6 text-center">
              <p className="text-3xl font-semibold">{mergedData.length}</p>
              <p className="text-xs tracking-widest text-slate-500 mt-1">
                TOTAL ACTIVE PARKING LOTS
              </p>
            </div>
            <div className="bg-white border p-6 text-center">
              <p className="text-3xl font-semibold text-red-600">
                {mergedData.filter((d) => d.excess > 0).length}
              </p>
              <p className="text-xs tracking-widest text-slate-500 mt-1">
                ACTIVE VIOLATIONS
              </p>
            </div>
          </div>

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
                  <th className="p-3">Excess Vehicles</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-left">Contractor</th>
                  <th className="p-3">Last Updated</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {mergedData.map((d, i) => (
                  <tr key={d.id}>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;