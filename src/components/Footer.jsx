import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#153a6b] text-white text-xs mt-8">
      <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">

        <p>
          © 2026 Municipal Corporation of Delhi
        </p>

        <p className="opacity-80">
          Smart Parking Capacity Enforcement System | For Official Use Only
        </p>

        <p className="opacity-60">
          AI-powered CCTV Vehicle Detection & Compliance Monitoring
        </p>

      </div>
    </footer>
  );
};

export default Footer;
