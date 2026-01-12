const express = require("express");
const router = express.Router();

let parkingLot = {
  lotId: "MCD_CP_01",
  location: "Connaught Place",
  capacity: 50,
  currentCount: 30,
  contractor: "ABC Parking Pvt Ltd"
};

router.get("/", (req, res) => {
  res.json(parkingLot);
});

router.updateCount = (count) => {
  parkingLot.currentCount = count;
};

router.getLot = () => parkingLot;

module.exports = router;