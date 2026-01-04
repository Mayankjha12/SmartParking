import React from "react";
import { Eye, RefreshCw } from "lucide-react";

const ParkingLots = () => {
  const lotData = [
    { id: 1, name: "Sector 17 Plaza", zone: "Zone A", cap: 150, occ: 142, status: "NEAR FULL", vio: 2, contractor: "ABC Parking Pvt. Ltd.", updated: "03-01-2026 14:32:15" },
    { id: 2, name: "City Center Mall", zone: "Zone B", cap: 300, occ: 315, status: "OVER CAPACITY", vio: 8, contractor: "Metro Park Solutions", updated: "03-01-2026 14:30:42" },
    { id: 3, name: "Railway Station (East)", zone: "Zone A", cap: 200, occ: 156, status: "NORMAL", vio: 1, contractor: "City Parkings Ltd.", updated: "03-01-2026 14:28:33" },
    { id: 4, name: "Bus Terminal", zone: "Zone C", cap: 100, occ: 78, status: "NORMAL", vio: 0, contractor: "ABC Parking Pvt. Ltd.", updated: "03-01-2026 14:25:18" },
    { id: 5, name: "Sarojini Nagar Market", zone: "Zone B", cap: 80, occ: 85, status: "OVER CAPACITY", vio: 5, contractor: "Green Park Services", updated: "03-01-2026 14:22:56" },
    { id: 6, name: "Lajpat Nagar Complex", zone: "Zone C", cap: 120, occ: 98, status: "NORMAL", vio: 0, contractor: "Metro Park Solutions", updated: "03-01-2026 14:20:11" },
    { id: 7, name: "Nehru Place IT Hub", zone: "Zone A", cap: 250, occ: 248, status: "NEAR FULL", vio: 3, contractor: "City Parkings Ltd.", updated: "03-01-2026 14:18:44" },
    { id: 8, name: "Connaught Place Block A", zone: "Zone A", cap: 180, occ: 165, status: "NEAR FULL", vio: 1, contractor: "ABC Parking Pvt. Ltd.", updated: "03-01-2026 14:15:22" },
    { id: 9, name: "Karol Bagh Market", zone: "Zone B", cap: 90, occ: 72, status: "NORMAL", vio: 0, contractor: "Urban Parking Solutions", updated: "03-01-2026 14:12:08" },
    { id: 10, name: "Dwarka Sector 21", zone: "Zone D", cap: 200, occ: 145, status: "NORMAL", vio: 0, contractor: "Quick Park India", updated: "03-01-2026 14:10:55" },
  ];

  return (
    <div className="bg-slate-100 min-h-screen p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-6 py-3 flex justify-between items-center rounded">
        <h2 className="font-semibold tracking-wide">PARKING LOTS REGISTRY</h2>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw size={14} />
          Last Updated: 04/01/2026, 06:19 pm
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold">10</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL PARKING LOTS
          </p>
        </div>
        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold text-red-600">20</p>
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

        <table className="w-full text-sm">
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
            {lotData.map(lot => (
              <tr key={lot.id} className="hover:bg-slate-50">
                <td className="p-3">{lot.id}</td>
                <td className="p-3 font-medium">{lot.name}</td>
                <td className="p-3 text-center">{lot.zone}</td>
                <td className="p-3 text-center">{lot.cap}</td>
                <td className="p-3 text-center font-semibold">{lot.occ}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded
                    ${
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

        <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500 flex justify-between">
          <span>Showing 10 parking lots</span>
          <span>Data source: AI-powered CCTV Vehicle Detection</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-slate-500">
        Municipal Corporation of Delhi | Parking Lots Registry | For Official Use Only
      </div>
    </div>
  );
};

export default ParkingLots;