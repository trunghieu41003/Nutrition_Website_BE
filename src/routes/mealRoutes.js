// src/routes/mealRoutes.js
const express = require('express');
const meal = require('../controllers/mealController');

const router = express.Router();

// Route để thêm thực phẩm vào bữa ăn
router.post('/meals/:mealId/foods/:foodId', meal.addFoodToMeal); // Thêm thực phẩm vào meal với mealId và foodId từ params, portion và size từ body
// Route để xóa thực phẩm khỏi bữa ăn
router.delete('/meals/:mealId/foods/:foodId', meal.removeFoodFromMeal); // Xóa thực phẩm khỏi meal với mealId và foodId từ params
// Route để cập nhật size hay portion cho món ăn trong bữa ăn
router.put('/meals/:mealId/foods/:foodId', meal.updatePortionSize); // Cập nhật portion và size với mealId và foodId từ params, portion và size từ body
// Route để xem chỉ số dinh dưỡng tổng trong bữa ăn
router.get('/meals', meal.getNutrition); // Xem chỉ số dinh dưỡng tổng
router.get('/meals/:mealId', meal.getNutritionbyid); // Xem chỉ số dinh dưỡng tổng của từng meal
module.exports = router;
