import React, { useEffect, useState } from "react";
import { Users, AlertTriangle, Eye, RefreshCw } from "lucide-react";

const Contractors = () => {
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleString()
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);

  const [cData, setCData] = useState([
    { name: "ABC Parking Pvt. Ltd.", lots: 5, v30: 4, penalty: 12000, status: "WARNING" },
    { name: "Metro Park Solutions", lots: 6, v30: 8, penalty: 28000, status: "CRITICAL" },
    { name: "City Parkings Ltd.", lots: 4, v30: 1, penalty: 0, status: "GOOD" },
    { name: "Green Park Services", lots: 3, v30: 6, penalty: 18000, status: "CRITICAL" },
    { name: "Urban Parking Solutions", lots: 4, v30: 2, penalty: 5000, status: "GOOD" },
    { name: "Quick Park India", lots: 2, v30: 3, penalty: 8000, status: "WARNING" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCData((prev) =>
        prev.map((c) => {
          const change = Math.random() > 0.6 ? 1 : 0;
          const newViolations = c.v30 + change;

          let newStatus = "GOOD";
          if (newViolations >= 6) newStatus = "CRITICAL";
          else if (newViolations >= 3) newStatus = "WARNING";

          return {
            ...c,
            v30: newViolations,
            penalty: newViolations * 3500,
            status: newStatus,
          };
        })
      );
      setLastUpdated(new Date().toLocaleString());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const totalContractors = cData.length;
  const totalViolations = cData.reduce((sum, c) => sum + c.v30, 0);
  const totalPenalty = cData.reduce((sum, c) => sum + c.penalty, 0);
  const criticalCount = cData.filter((c) => c.status === "CRITICAL").length;

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-4 md:px-6 py-3 flex justify-between rounded">
        <h2 className="font-semibold">
          CONTRACTOR COMPLIANCE MANAGEMENT
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <RefreshCw size={14} />
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border p-6 text-center">
          <Users className="mx-auto text-slate-400 mb-2" size={22} />
          <p className="text-3xl font-semibold">{totalContractors}</p>
          <p className="text-xs text-slate-500">TOTAL CONTRACTORS</p>
        </div>

        <div className="bg-white border p-6 text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-2" size={22} />
          <p className="text-3xl font-semibold text-red-600">
            {totalViolations}
          </p>
          <p className="text-xs text-slate-500">TOTAL VIOLATIONS (30 DAYS)</p>
        </div>

        <div className="bg-white border p-6 text-center">
          <p className="text-3xl font-semibold text-orange-600">
            ₹{totalPenalty.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">TOTAL PENALTY DUE</p>
        </div>

        <div className="bg-white border p-6 text-center border-red-200">
          <p className="text-3xl font-semibold text-red-600">
            {criticalCount}
          </p>
          <p className="text-xs text-slate-500">CRITICAL STATUS</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <div className="bg-[#2f4f85] text-white px-4 py-2 font-semibold">
          CONTRACTOR PERFORMANCE – LAST 30 DAYS
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-3">S.No.</th>
                <th className="p-3 text-left">Contractor Name</th>
                <th className="p-3">Parking Lots</th>
                <th className="p-3">Violations (30d)</th>
                <th className="p-3 text-red-600">Penalty (₹)</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {cData.map((c, i) => (
                <tr key={i}>
                  <td className="p-3 text-center">{i + 1}</td>
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
                      className={`px-2 py-1 text-xs font-semibold rounded ${
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
                    <button
                      onClick={() => {
                        setSelectedContractor(c);
                        setOpenModal(true);
                      }}
                      className="flex items-center gap-1 mx-auto text-slate-500 hover:text-blue-600"
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-5xl rounded shadow-lg">

            <div className="flex justify-between px-4 py-2 bg-[#4a74b3] text-white">
              <h3 className="font-semibold">
                Contractor Review – {selectedContractor?.name}
              </h3>
              <button
                onClick={() => setOpenModal(false)}
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <video
                src="/parking-demo.mp4"
                controls
                autoPlay
                muted
                className="w-full rounded"
              />

              <div className="text-sm text-slate-600">
                <p className="mb-3">
                  Name: Rakesh Yadav <br/>
                  Phone number: +91-XXXXXXXXXX <br/>
                  Number Plate: XXX-XXX-XXXX <br/>
                  Address: XYZ Block, ABC Colony, New Delhi - 110023
                
                </p>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contractors;
