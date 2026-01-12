const express = require("express");
const router = express.Router();

let violations = [];

router.get("/", (req, res) => {
  res.json(violations.slice(-5));
});

router.addViolation = (data) => {
  violations.push(data);
};

module.exports = router;