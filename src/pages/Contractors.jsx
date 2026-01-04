import React from "react";
import { Users, AlertTriangle, Eye, RefreshCw } from "lucide-react";

const Contractors = () => {
  const cData = [
    { name: "ABC Parking Pvt. Ltd.", lots: 5, v30: 4, penalty: 12000, status: "WARNING" },
    { name: "Metro Park Solutions", lots: 6, v30: 8, penalty: 28000, status: "CRITICAL" },
    { name: "City Parkings Ltd.", lots: 4, v30: 1, penalty: 0, status: "GOOD" },
    { name: "Green Park Services", lots: 3, v30: 6, penalty: 18000, status: "CRITICAL" },
    { name: "Urban Parking Solutions", lots: 4, v30: 2, penalty: 5000, status: "GOOD" },
    { name: "Quick Park India", lots: 2, v30: 3, penalty: 8000, status: "WARNING" },
  ];

  return (
    <div className="bg-slate-100 min-h-screen p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-6 py-3 flex justify-between items-center rounded">
        <h2 className="font-semibold tracking-wide">
          CONTRACTOR COMPLIANCE MANAGEMENT
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw size={14} />
          Last Updated: 04/01/2026, 12:11 pm
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border p-6 text-center">
          <Users className="mx-auto text-slate-400 mb-2" size={22} />
          <p className="text-3xl font-semibold">6</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL CONTRACTORS
          </p>
        </div>

        <div className="bg-white border p-6 text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-2" size={22} />
          <p className="text-3xl font-semibold text-red-600">24</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL VIOLATIONS (30 DAYS)
          </p>
        </div>

        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold text-orange-600">₹71,000</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            TOTAL PENALTY DUE
          </p>
        </div>

        <div className="bg-white border p-6 text-center border-red-200">
          <p className="text-3xl font-semibold text-red-600">2</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            CRITICAL STATUS
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <div className="bg-[#2f4f85] text-white px-4 py-2 font-semibold">
          CONTRACTOR PERFORMANCE – LAST 30 DAYS
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-3 text-left">S.No.</th>
              <th className="p-3 text-left">Contractor Name</th>
              <th className="p-3 text-center">Parking Lots Managed</th>
              <th className="p-3 text-center">Total Violations (30 Days)</th>
              <th className="p-3 text-center text-red-600">Penalty Due (₹)</th>
              <th className="p-3 text-center">Compliance Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {cData.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3 text-center">{c.lots}</td>
                <td className="p-3 text-center text-orange-600 font-semibold">
                  {c.v30}
                </td>
                <td className="p-3 text-center text-red-600 font-semibold">
                  ₹{c.penalty.toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded
                    ${
                      c.status === "CRITICAL"
                        ? "bg-red-100 text-red-600"
                        : c.status === "WARNING"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className="flex items-center gap-1 mx-auto text-slate-500 hover:text-blue-600 text-sm">
                    <Eye size={16} /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500 italic">
          NOTE: Contractors with "CRITICAL" status are subject to immediate review
          and potential contract termination.
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-slate-500">
        Municipal Corporation of Delhi | Contractor Compliance Module | For Official Use Only
      </div>
    </div>
  );
};

export default Contractors;