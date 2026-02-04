const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const { authenticate } = require("../authenticate");

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Forgot password
router.post("/forgot-password", userController.forgotPassword);

// Reset password
router.post("/reset-password/:token", userController.resetPassword);

// Enable MFA
router.post("/enable-mfa", authenticate, userController.enableMFA);

module.exports = router;
