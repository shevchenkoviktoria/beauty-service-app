const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware");
const router = express.Router();

// Admin-only route
router.get("/admin", authenticateUser, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

// Beauty master-only route
router.get("/beauty_master", authenticateUser, authorizeRoles("beauty_master"), (req, res) => {
    res.json({ message: "Welcome, Beauty Master!" });
});

// Customer-only route
router.get("/customer", authenticateUser, authorizeRoles("customer"), (req, res) => {
    res.json({ message: "Welcome, Customer!" });
});

module.exports = router;
