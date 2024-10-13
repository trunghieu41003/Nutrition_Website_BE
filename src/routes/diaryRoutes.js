// routes/tdeeRoutes.js
const express = require('express');
const diaryController = require('../controllers/DiaryController');

const router = express.Router();

// Route cập nhật TDEE cho người dùng dựa trên userId
router.put('/users/:userId/updateTDEE', diaryController.updateUserTDEE);

module.exports = router;
