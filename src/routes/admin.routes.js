const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller')

router.post('/food/add', admin.addFood);
router.post('/food/update', admin.updateFood);
router.post('/food/delete', admin.deleteFood);
router.post('/food/search', admin.findFoodByNameContaining);
router.post('/meal', admin.findAllMeal);
router.post('/meal/add', admin.addMeal);
router.post('/meal/update', admin.updateMeal);
router.post('/meal/delete', admin.deleteMeal);
router.post('/meal/search', admin.findMealByNameContaining);
module.exports = router;