const express = require("express");
const router = express.Router();
const { authenticate } = require("../authenticate");

router.get("/", authenticate, (req, res) => {
  res.json({
    msg: "Welcome to protected home route",
    user: req.user
  });
});

module.exports = router;
