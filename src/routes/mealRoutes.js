const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Thêm món ăn vào danh sách
router.post('/diaries/:diaryId/meals/:mealId/foods/:foodId', mealController.addFoodToMeal);

// Xóa món ăn khỏi danh sách
router.delete('/diaries/:diaryId/meals/:mealId/foods/:foodId', mealController.removeFoodFromMeal);

// Cập nhật portion và size của món ăn
router.put('/diaries/:diaryId/meals/:mealId/foods/:foodId', mealController.updatePortionSize);

// Lấy tổng dinh dưỡng của danh sách trong 1 bữa ăn
router.get('/diaries/:diaryId/meals/:mealId/nutritions', mealController.getNutritionById);

// Lấy dinh dưỡng tất cả
//router.get('/diaries/:diaryId/nutritions', mealController.getNutrition);

router.get('/diaries/:diaryId/meals/:mealId/foods/:foodId', mealController.getfoodInformation);


module.exports = router;

