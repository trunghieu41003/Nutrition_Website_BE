// src/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Định nghĩa các route RESTful cho User 
router.get('/users/:userId/reports', reportController.CaloriesReport);

module.exports = router;
