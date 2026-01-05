import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#153a6b] text-white text-[11px] mt-auto border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* MAIN CONTENT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">

          {/* LEFT */}
          <p className="font-semibold tracking-wide">
            © 2026 Municipal Corporation of Delhi
          </p>

          {/* CENTER */}
          <p className="opacity-80 leading-snug">
            Smart Parking Capacity Enforcement System
          </p>

          {/* RIGHT */}
          <p className="opacity-60 leading-snug">
            AI-powered CCTV Vehicle Detection & Compliance Monitoring
          </p>

        </div>

        {/* MOBILE */}
        <div className="mt-3 text-center text-[10px] opacity-70 uppercase tracking-widest">
          For Official Use Only
        </div>

      </div>
    </footer>
  );
};

export default Footer;
