import React from "react";
import HNLogo from "../assets/hn-logo.png";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-gradient-to-br from-[#0a1f44] via-[#0f2e57] to-[#123b7a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* TOP ROW */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* LEFT – LOGO + GOV TEXT */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <img
                src={HNLogo}
                alt="Municipal Corporation of Delhi Logo"
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="text-sm font-semibold tracking-wide">
                  Municipal Corporation of Delhi
                </p>
                <p className="text-[11px] opacity-80 tracking-widest uppercase mt-1">
                  Smart City Initiative
                </p>
              </div>
            </div>

            {/* RIGHT – SYSTEM INFO */}
            <div className="text-center md:text-right">
              <p className="text-sm font-medium">
                Smart Parking Capacity Enforcement
              </p>
              <p className="text-[11px] opacity-80 mt-1 tracking-wide">
                AI-Powered CCTV Vehicle Detection System
              </p>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* BOTTOM ROW */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] opacity-80">
            <p className="tracking-wide">
              © 2026 Municipal Corporation of Delhi. All Rights Reserved.
            </p>

            <p className="tracking-[0.2em] uppercase text-[10px]">
              For Official Use Only
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;