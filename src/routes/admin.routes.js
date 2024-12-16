const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller')

router.post('/food/add', admin.addFood);
router.post('/food/update', admin.updateFood);
router.post('/food/delete', admin.deleteFood);
module.exports = router;