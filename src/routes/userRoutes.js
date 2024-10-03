// src/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa các route RESTful cho User
router.get('/users', userController.getUsers);        // Lấy tất cả User
router.post('/users', userController.addUser);         // Thêm User mới
router.put('/users/:id', userController.updateUser);    // Cập nhật User theo id
router.delete('/users/:id', userController.deleteUser); // Xóa User theo id
module.exports = router;
