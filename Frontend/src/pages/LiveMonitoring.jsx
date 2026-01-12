import React, { useEffect, useState } from "react";
import {
  Video,
  CheckCircle,
  WifiOff,
  RefreshCw,
  Camera,
} from "lucide-react";

const LiveMonitoring = () => {
  /* ---------- STATIC CAMERA LIST (CITY SCALE DEMO) ---------- */
  const [cameraListData, setCameraListData] = useState([
    {
      name: "Sector 17 Plaza - Entry Gate",
      current: 142,
      capacity: 150,
      status: "ONLINE",
      time: "03-01-2026 14:32:15",
    },
    {
      name: "City Center Mall - Level 1",
      current: 165,
      capacity: 150,
      status: "VIOLATION",
      time: "03-01-2026 14:30:42",
    },
    {
      name: "City Center Mall - Level 2",
      current: 150,
      capacity: 150,
      status: "ONLINE",
      time: "03-01-2026 14:30:38",
    },
    {
      name: "Railway Station - Main Entry",
      current: 156,
      capacity: 200,
      status: "ONLINE",
      time: "03-01-2026 14:28:33",
    },
    {
      name: "Bus Terminal - North Gate",
      current: null,
      capacity: null,
      status: "OFFLINE",
      time: "03-01-2026 12:15:00",
    },
    {
      name: "Sarojini Nagar - Main Entry",
      current: 85,
      capacity: 80,
      status: "VIOLATION",
      time: "03-01-2026 14:22:56",
    },
    {
      name: "Nehru Place - Block A Entry",
      current: 248,
      capacity: 250,
      status: "ONLINE",
      time: "03-01-2026 14:18:44",
    },
    {
      name: "Connaught Place - Block A",
      current: 165,
      capacity: 180,
      status: "ONLINE",
      time: "03-01-2026 14:15:22",
    },
  ]);

  const [lastSynced, setLastSynced] = useState(
    new Date().toLocaleString()
  );

  /* ---------- LIVE BACKEND DATA (REAL CCTV SIMULATION) ---------- */
  const [liveParking, setLiveParking] = useState(null);

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

  /* ---------- SIMULATION + MERGE LIVE CAMERA ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCameraListData((prev) =>
        prev.map((cam) => {
          if (cam.status === "OFFLINE") return cam;

          // 🔴 Live backend wired camera
          if (
            liveParking &&
            cam.name.toLowerCase().includes("connaught place")
          ) {
            const excess =
              liveParking.currentCount - liveParking.capacity;

            return {
              ...cam,
              current: liveParking.currentCount,
              capacity: liveParking.capacity,
              status: excess > 0 ? "VIOLATION" : "ONLINE",
              time: new Date().toLocaleString(),
            };
          }

          // 🟡 Simulated cameras
          const variation = Math.floor(Math.random() * 5) - 2;
          const newCount = cam.current + variation;

          let newStatus = "ONLINE";
          if (newCount > cam.capacity) newStatus = "VIOLATION";

          return {
            ...cam,
            current: newCount,
            status: newStatus,
            time: new Date().toLocaleString(),
          };
        })
      );

      setLastSynced(new Date().toLocaleString());
    }, 5000);

    return () => clearInterval(interval);
  }, [liveParking]);

  const onlineCount = cameraListData.filter(
    (c) => c.status !== "OFFLINE"
  ).length;
  const offlineCount = cameraListData.filter(
    (c) => c.status === "OFFLINE"
  ).length;

  const mainCam = cameraListData[0];

  return (
    <div className="bg-slate-100 min-h-screen p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-[#4a74b3] text-white px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 rounded">
        <h2 className="font-semibold tracking-wide text-sm md:text-base">
          LIVE CCTV MONITORING – AI VEHICLE DETECTION
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <RefreshCw size={14} />
          Last Synced: {lastSynced}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border p-6 text-center">
          <CheckCircle className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-3xl font-semibold">{onlineCount}</p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            CAMERAS ONLINE
          </p>
        </div>
        <div className="bg-white border p-6 text-center">
          <WifiOff className="mx-auto text-red-600 mb-2" size={22} />
          <p className="text-3xl font-semibold text-red-600">
            {offlineCount}
          </p>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            CAMERAS OFFLINE
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT – CCTV FEED */}
        <div className="lg:col-span-8 bg-white border rounded overflow-hidden">
          <div className="bg-[#4a74b3] text-white px-4 py-2 flex justify-between items-center text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Video size={14} /> {mainCam.name}
            </span>
            <span className="text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              LIVE
            </span>
          </div>

          <div className="h-[260px] md:h-[360px] bg-slate-50 flex flex-col items-center justify-center">
            <Video size={48} className="text-slate-300 mb-2" />
            <p className="text-slate-400 text-sm">
              CCTV Feed Placeholder
            </p>
          </div>

          <div className="grid grid-cols-3 border-t text-center">
            <div className="p-4">
              <p className="text-xs text-slate-500 uppercase">
                Current Count
              </p>
              <p className="text-2xl font-semibold">
                {mainCam.current}
              </p>
            </div>
            <div className="p-4 border-l border-r">
              <p className="text-xs text-slate-500 uppercase">
                Allowed Capacity
              </p>
              <p className="text-2xl font-semibold">
                {mainCam.capacity}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-500 uppercase">
                Status
              </p>
              <p
                className={`text-2xl font-semibold ${
                  mainCam.current > mainCam.capacity
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {mainCam.current > mainCam.capacity
                  ? "OVER CAPACITY"
                  : "NORMAL"}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 px-4 py-2 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-1">
            <span>Last Frame Update: {mainCam.time}</span>
            <span>AI Processing: Real-time</span>
          </div>
        </div>

        {/* RIGHT – CAMERA LIST */}
        <div className="lg:col-span-4 bg-white border rounded overflow-hidden">
          <div className="bg-[#4a74b3] text-white px-4 py-2 font-semibold">
            CAMERA LIST
          </div>

          <div className="flex justify-between px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
            <span>Camera</span>
            <span>Status</span>
          </div>

          <div className="divide-y max-h-[420px] md:max-h-[520px] overflow-y-auto">
            {cameraListData.map((cam, i) => (
              <div key={i} className="px-4 py-3 hover:bg-slate-50">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{cam.name}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Camera size={12} />
                      <span>
                        {cam.current !== null
                          ? `${cam.current} / ${cam.capacity}`
                          : "---"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {cam.time}
                    </p>
                  </div>

                  <span
                    className={`h-fit px-2 py-0.5 text-xs font-semibold rounded ${
                      cam.status === "ONLINE"
                        ? "bg-green-100 text-green-600"
                        : cam.status === "VIOLATION"
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
    </div>
  );
};

export default LiveMonitoring;