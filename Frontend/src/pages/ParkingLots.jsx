import React, { useEffect, useState } from "react";
import { Eye, RefreshCw } from "lucide-react";

const initialLots = [
  { id: 1, name: "Sector 17 Plaza", zone: "Zone A", cap: 150, occ: 142, contractor: "ABC Parking Pvt. Ltd." },
  { id: 2, name: "City Center Mall", zone: "Zone B", cap: 300, occ: 315, contractor: "Metro Park Solutions" },
  { id: 3, name: "Railway Station (East)", zone: "Zone A", cap: 200, occ: 156, contractor: "City Parkings Ltd." },
  { id: 4, name: "Bus Terminal", zone: "Zone C", cap: 100, occ: 78, contractor: "ABC Parking Pvt. Ltd." },
  { id: 5, name: "Sarojini Nagar Market", zone: "Zone B", cap: 80, occ: 85, contractor: "Green Park Services" },
  { id: 6, name: "Lajpat Nagar Complex", zone: "Zone C", cap: 120, occ: 98, contractor: "Metro Park Solutions" },
  { id: 7, name: "Nehru Place IT Hub", zone: "Zone A", cap: 250, occ: 248, contractor: "City Parkings Ltd." },
  { id: 8, name: "Connaught Place Block A", zone: "Zone A", cap: 180, occ: 165, contractor: "ABC Parking Pvt. Ltd." },
  { id: 9, name: "Karol Bagh Market", zone: "Zone B", cap: 90, occ: 72, contractor: "Urban Parking Solutions" },
  { id: 10, name: "Dwarka Sector 21", zone: "Zone D", cap: 200, occ: 145, contractor: "Quick Park India" },
];

const ParkingLots = () => {
  const [lots, setLots] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleString()
  );
  const [liveParking, setLiveParking] = useState(null);

  /* ---------- INIT + SIMULATION ---------- */
  useEffect(() => {
    setLots(
      initialLots.map((l) => ({
        ...l,
        updated: new Date().toLocaleString(),
        vio: 0,
        status: "NORMAL",
      }))
    );

    const interval = setInterval(() => {
      setLots((prev) =>
        prev.map((lot) => {
          const change = Math.floor(Math.random() * 6) - 3;
          const newOcc = Math.max(0, lot.occ + change);
          const excess = newOcc - lot.cap;

          let status = "NORMAL";
          let vio = lot.vio;

          if (excess > 0) {
            status = "OVER CAPACITY";
            vio = lot.vio + 1;
          } else if (excess > -10) {
            status = "NEAR FULL";
          }

          return {
            ...lot,
            occ: newOcc,
            status,
            vio,
            updated: new Date().toLocaleString(),
          };
        })
      );

      setLastUpdated(new Date().toLocaleString());
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  /* ---------- LIVE BACKEND DATA ---------- */
  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/parking");
        const data = await res.json();
        setLiveParking(data);
      } catch (e) {
        console.error("Backend not reachable");
      }
    };

    fetchLive();
    const apiInterval = setInterval(fetchLive, 8000);
    return () => clearInterval(apiInterval);
  }, []);

  /* ---------- MERGE LIVE LOT ---------- */
  const mergedLots = lots.map((lot) => {
    if (
      liveParking &&
      lot.name.toLowerCase().includes("connaught place")
    ) {
      const excess = liveParking.currentCount - liveParking.capacity;

      return {
        ...lot,
        cap: liveParking.capacity,
        occ: liveParking.currentCount,
        contractor: liveParking.contractor,
        status: excess > 0 ? "OVER CAPACITY" : "NORMAL",
        vio: excess > 0 ? lot.vio + 1 : lot.vio,
        updated: new Date().toLocaleString(),
      };
    }
    return lot;
  });

  const totalLots = mergedLots.length;
  const totalViolations = mergedLots.reduce((sum, l) => sum + l.vio, 0);

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 rounded">
        <h2 className="font-semibold tracking-wide text-sm md:text-base">
          PARKING LOTS REGISTRY
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <RefreshCw size={14} />
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold">{totalLots}</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL PARKING LOTS
          </p>
        </div>
        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold text-red-600">
            {totalViolations}
          </p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL VIOLATIONS (30 DAYS)
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <div className="bg-[#4a74b3] text-white px-4 py-2 font-semibold">
          ALL REGISTERED PARKING LOTS
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-3 text-left">S.No.</th>
                <th className="p-3 text-left">Parking Lot Name</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Allowed Capacity</th>
                <th className="p-3">Current Occupancy</th>
                <th className="p-3">Status</th>
                <th className="p-3">Violations (30 Days)</th>
                <th className="p-3 text-left">Contractor</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {mergedLots.map((lot, i) => (
                <tr key={lot.id} className="hover:bg-slate-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{lot.name}</td>
                  <td className="p-3 text-center">{lot.zone}</td>
                  <td className="p-3 text-center">{lot.cap}</td>
                  <td className="p-3 text-center font-semibold">{lot.occ}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        lot.status === "OVER CAPACITY"
                          ? "bg-red-100 text-red-600"
                          : lot.status === "NEAR FULL"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {lot.status}
                    </span>
                  </td>
                  <td className="p-3 text-center font-semibold text-red-600">
                    {lot.vio}
                  </td>
                  <td className="p-3">{lot.contractor}</td>
                  <td className="p-3 text-xs">{lot.updated}</td>
                  <td className="p-3 text-center">
                    <button className="flex items-center gap-1 text-slate-500 hover:text-blue-600 mx-auto">
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-1">
          <span>Showing {mergedLots.length} parking lots</span>
          <span>Data source: AI-powered CCTV Vehicle Detection</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingLots;