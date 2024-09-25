// src/routes/mealRoutes.js
const express = require('express');
const { AddFoodInMeal } = require('../controllers/mealController');
const router = express.Router();

// Route để thêm thực phẩm vào bữa ăn
router.post('/meals/:mealId/foods/:foodId', AddFoodInMeal);

// Route để xóa thực phẩm khỏi bữa ăn
router.delete('/meals/:mealId/foods/:foodId', AddFoodInMeal);

module.exports = router;
