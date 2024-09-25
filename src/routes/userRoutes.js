// src/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa các route RESTful cho User
router.get('/', userController.getUsers);        // Lấy tất cả User
router.post('/', userController.addUser);         // Thêm User mới
router.put('/:id', userController.updateUser);    // Cập nhật User theo id
router.delete('/:id', userController.deleteUser); // Xóa User theo id

module.exports = router;
