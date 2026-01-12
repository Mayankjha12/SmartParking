const express = require("express");
const cors = require("cors");

const parkingRoutes = require("./routes/parking.routes");
const violationRoutes = require("./routes/violation.routes");
const { startAISimulation } = require("./services/aiSimulator");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/parking", parkingRoutes);
app.use("/api/violations", violationRoutes);

startAISimulation();

app.listen(5001, () => {
  console.log("Backend running on http://localhost:5001");
});