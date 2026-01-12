const parkingRoute = require("../routes/parking.routes");
const violationRoute = require("../routes/violation.routes");

function startAISimulation() {
  setInterval(() => {
    const detected = Math.floor(Math.random() * 70);

    const lot = parkingRoute.getLot();
    parkingRoute.updateCount(detected);

    if (detected > lot.capacity) {
      violationRoute.addViolation({
        lotId: lot.lotId,
        time: new Date().toLocaleString(),
        detected,
        capacity: lot.capacity,
        severity:
          detected - lot.capacity > 10 ? "HIGH" : "MEDIUM"
      });
    }
  }, 8000);
}

module.exports = { startAISimulation };