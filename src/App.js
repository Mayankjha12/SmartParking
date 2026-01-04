import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import LiveMonitoring from "./pages/LiveMonitoring";
import ParkingLots from "./pages/ParkingLots";
import Violations from "./pages/Violations";
import Contractors from "./pages/Contractors";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  // Switch between pages
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "live":
        return <LiveMonitoring />;
      case "lots":
        return <ParkingLots />;
      case "violations":
        return <Violations />;
      case "contractors":
        return <Contractors />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* NAVBAR */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/*MAIN CONTENT*/}
      <main className="flex-grow overflow-x-hidden">
        {renderPage()}
      </main>

      {/* FOOTER*/}
      <Footer />

    </div>
  );
}

export default App;
