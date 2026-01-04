import React from "react";
import { AlertTriangle, CheckCircle, Eye, RefreshCw } from "lucide-react";

const Violations = () => {
  const vData = [
    {
      id: "VIO-2026-0001",
      loc: "City Center Mall",
      con: "Metro Park Solutions",
      type: "Over Capacity",
      excess: "+15",
      sev: "HIGH",
      time: "03-01-2026 14:30:42",
      status: "PENDING",
    },
    {
      id: "VIO-2026-0002",
      loc: "Sarojini Nagar Market",
      con: "Green Park Services",
      type: "Over Capacity",
      excess: "+5",
      sev: "MEDIUM",
      time: "03-01-2026 14:22:56",
      status: "PENDING",
    },
    {
      id: "VIO-2026-0003",
      loc: "Nehru Place IT Hub",
      con: "City Parkings Ltd.",
      type: "Over Capacity",
      excess: "+8",
      sev: "MEDIUM",
      time: "03-01-2026 12:15:33",
      status: "PENDING",
    },
  ];

  return (
    <div className="bg-slate-100 min-h-screen p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-6 py-3 flex justify-between items-center rounded">
        <h2 className="font-semibold tracking-wide">
          VIOLATION RECORDS – AUDIT LOG
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw size={14} />
          Last Updated: 04/01/2026, 06:23 pm
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <AlertTriangle className="mx-auto text-orange-500 mb-2" size={22} />
          <p className="text-3xl font-semibold text-orange-600">3</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            PENDING VIOLATIONS
          </p>
        </div>

        <div className="bg-white border p-6 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-3xl font-semibold text-green-600">3</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            RESOLVED VIOLATIONS
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">

        {/* TABLE HEADER */}
        <div className="bg-[#4a74b3] text-white px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold">
            CAPACITY VIOLATION RECORDS
          </h3>

          <div className="flex gap-2 text-sm">
            <button className="bg-white/20 px-3 py-1 rounded">
              Pending (3)
            </button>
            <button className="bg-white/10 px-3 py-1 rounded">
              Resolved (3)
            </button>
            <button className="bg-white/10 px-3 py-1 rounded">
              All (6)
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-3 text-left">Violation ID</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Contractor</th>
              <th className="p-3 text-left">Violation Type</th>
              <th className="p-3">Excess Count</th>
              <th className="p-3">Severity</th>
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {vData.map((v, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-3 font-mono text-slate-600">{v.id}</td>
                <td className="p-3 font-medium">{v.loc}</td>
                <td className="p-3">{v.con}</td>
                <td className="p-3 italic">{v.type}</td>
                <td className="p-3 text-center font-semibold text-red-600">
                  {v.excess}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded
                    ${
                      v.sev === "HIGH"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {v.sev}
                  </span>
                </td>
                <td className="p-3 text-slate-500">{v.time}</td>
                <td className="p-3 text-center">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 text-xs rounded font-semibold">
                    PENDING
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className="flex items-center gap-1 mx-auto text-slate-500 hover:text-blue-600">
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TABLE FOOTER */}
        <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500">
          All violation records are auto-generated from AI-powered CCTV detection.
          Timestamps are tamper-proof.
        </div>
      </div>

      {/* PAGE FOOTER */}
      <div className="text-center text-xs text-slate-500">
        Municipal Corporation of Delhi | Violation Audit Module | For Official Use Only
      </div>
    </div>
  );
};

export default Violations;