// src/controllers/mealController.js
const mealModel = require('../models/mealModel');

// Hàm để thêm hoặc xóa thực phẩm khỏi bữa ăn
const AddFoodInMeal = async (req, res) => {
  const { mealId, foodId } = req.params; // Lấy mealId và foodId từ request parameters
  const action = req.method === 'POST' ? 'add' : 'remove'; // Xác định hành động dựa trên phương thức HTTP

  try {
    const result = await mealModel. manageFoodInMeal(mealId, foodId, action);
    const nutritionData = await mealModel. getTotalNutrition();
    res.status(200).json({ message: `Food ${action}ed successfully`, result,nutritionData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  AddFoodInMeal,
};
