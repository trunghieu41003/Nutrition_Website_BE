const express = require('express');
const router = express.Router();
const mealController = require('../controllers/myMealController');
// Thêm món ăn vào danh sách
router.post('/:diaryId/meals/:mealId/foods/:foodId', mealController.addFoodToMeal);

// Xóa món ăn khỏi danh sách
router.delete('/:diaryId/meals/:mealId/foods/:foodId', mealController.removeFoodFromMeal);

// Cập nhật portion và size của món ăn
router.put('/:diaryId/meals/:mealId/foods/:foodId', mealController.updatePortionSize);

// Lấy tổng dinh dưỡng của danh sách trong 1 bữa ăn
router.get('/:diaryId/meals/:mealId/nutritions', mealController.getNutritionById);

// Lấy dinh dưỡng tất cả
//router.get('/ /:diaryId/nutritions', mealController.getNutrition);
router.get('/:diaryId/meals/:mealId/foods/:foodId', mealController.getfoodInformation);

router.post('/user/:userId', mealController.addNewDiary);
module.exports = router;

