const express = require("express");
const router = express.Router();
// const userController = require("../controllers/user.controller");

// const { protect, restrictTo, restrictToSelf} = require("../middlewares/auth.middleware");

// Crear cuenta
router.post('/signup', userController.register);

// 