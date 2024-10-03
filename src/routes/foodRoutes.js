// src/routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Định nghĩa các route RESTful cho Food
router.get('/foods', foodController.getFoods);        // Lấy tất cả thực phẩm
router.post('/foods', foodController.addFood);         // Thêm thực phẩm mới
router.put('/foods/:id', foodController.updateFood);    // Cập nhật thực phẩm theo id
router.delete('/foods/:id', foodController.deleteFood); // Xóa thực phẩm theo id

module.exports = router;
