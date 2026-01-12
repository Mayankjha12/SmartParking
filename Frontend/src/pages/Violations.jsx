import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Eye, RefreshCw } from "lucide-react";

const Violations = () => {
  const [filter, setFilter] = useState("PENDING");
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleString()
  );

  /* ---------- BASE VIOLATIONS (SIMULATED CITY DATA) ---------- */
  const [vData, setVData] = useState([
    {
      id: "VIO-2026-0001",
      loc: "City Center Mall",
      con: "Metro Park Solutions",
      type: "Over Capacity",
      excess: 15,
      sev: "HIGH",
      time: "03-01-2026 14:30:42",
      status: "PENDING",
    },
    {
      id: "VIO-2026-0002",
      loc: "Sarojini Nagar Market",
      con: "Green Park Services",
      type: "Over Capacity",
      excess: 5,
      sev: "MEDIUM",
      time: "03-01-2026 14:22:56",
      status: "PENDING",
    },
    {
      id: "VIO-2026-0003",
      loc: "Nehru Place IT Hub",
      con: "City Parkings Ltd.",
      type: "Over Capacity",
      excess: 8,
      sev: "MEDIUM",
      time: "03-01-2026 12:15:33",
      status: "PENDING",
    },
  ]);

  /* ---------- LIVE BACKEND VIOLATIONS ---------- */
  const [liveViolations, setLiveViolations] = useState([]);

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/violations");
        const apiData = await res.json();

        const mapped = apiData.map((v, i) => ({
          id: `LIVE-${i + 1}`,
          loc: "Connaught Place Block A",
          con: "ABC Parking Pvt. Ltd.",
          type: "Over Capacity",
          excess: v.detected - v.capacity,
          sev: v.severity,
          time: v.time,
          status: "PENDING",
        }));

        setLiveViolations(mapped);
      } catch (e) {
        console.error("Backend not reachable");
      }
    };

    fetchViolations();
    const apiInterval = setInterval(fetchViolations, 8000);
    return () => clearInterval(apiInterval);
  }, []);

  /* ---------- AUTO RESOLVE SIMULATION ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setVData((prev) =>
        prev.map((v) =>
          v.status === "PENDING" && Math.random() > 0.7
            ? { ...v, status: "RESOLVED" }
            : v
        )
      );
      setLastUpdated(new Date().toLocaleString());
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  /* ---------- MERGED DATA ---------- */
  const mergedData = [...liveViolations, ...vData];

  const pendingCount = mergedData.filter(
    (v) => v.status === "PENDING"
  ).length;
  const resolvedCount = mergedData.filter(
    (v) => v.status === "RESOLVED"
  ).length;

  const filteredData =
    filter === "ALL"
      ? mergedData
      : mergedData.filter((v) => v.status === filter);

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 rounded">
        <h2 className="font-semibold tracking-wide text-sm md:text-base">
          VIOLATION RECORDS – AUDIT LOG
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <RefreshCw size={14} />
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <AlertTriangle className="mx-auto text-orange-500 mb-2" size={22} />
          <p className="text-3xl font-semibold text-orange-600">
            {pendingCount}
          </p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            PENDING VIOLATIONS
          </p>
        </div>

        <div className="bg-white border p-6 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-3xl font-semibold text-green-600">
            {resolvedCount}
          </p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            RESOLVED VIOLATIONS
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">

        <div className="bg-[#4a74b3] text-white px-4 py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <h3 className="font-semibold">
            CAPACITY VIOLATION RECORDS
          </h3>

          <div className="flex gap-2 text-xs md:text-sm">
            {["PENDING", "RESOLVED", "ALL"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded ${
                  filter === f ? "bg-white/30" : "bg-white/10"
                }`}
              >
                {f === "ALL"
                  ? `All (${mergedData.length})`
                  : `${f.charAt(0) + f.slice(1).toLowerCase()} (${
                      f === "PENDING" ? pendingCount : resolvedCount
                    })`}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-3 text-left">Violation ID</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Contractor</th>
                <th className="p-3 text-left">Violation Type</th>
                <th className="p-3">Excess</th>
                <th className="p-3">Severity</th>
                <th className="p-3 text-left">Timestamp</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredData.map((v, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-mono text-slate-600">{v.id}</td>
                  <td className="p-3 font-medium">{v.loc}</td>
                  <td className="p-3">{v.con}</td>
                  <td className="p-3 italic">{v.type}</td>
                  <td className="p-3 text-center font-semibold text-red-600">
                    +{v.excess}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
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
                    <span
                      className={`px-2 py-1 text-xs rounded font-semibold ${
                        v.status === "PENDING"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {v.status}
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
        </div>

        <div className="px-4 py-2 bg-slate-50 text-xs text-slate-500">
          Auto-generated via AI-powered CCTV detection | Tamper-proof logs
        </div>
      </div>
    </div>
  );
};

export default Violations;