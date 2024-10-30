const express = require('express');
const router = express.Router();
const userController = require('../controllers/setting.controller');

router.put('/users/:userId', userController.updateUserInfo);
router.get('/users/:userId', userController.getUserInfo);
module.exports = router;