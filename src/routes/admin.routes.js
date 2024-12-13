const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller')

router.post('/food/add', admin.addFood);
module.exports = router;