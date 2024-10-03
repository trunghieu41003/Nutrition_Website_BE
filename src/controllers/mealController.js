// src/controllers/mealController.js
const mealModel = require('../models/mealModel');

// Thêm món ăn vào meal
const addFoodToMeal = async (req, res) => {
  const { mealId, foodId } = req.params; // Lấy mealId và foodId từ params
  const { portion, size } = req.body; // Lấy portion và size từ body

  try {
    // Kiểm tra xem món ăn đã tồn tại trong meal chưa
    const checkResults = await mealModel.checkFoodInMeal(mealId, foodId);
    if (checkResults.length === 0) {
      // Thêm món ăn vào meal
      await mealModel.insertFoodInMeal(mealId, foodId, portion, size);
      // Cập nhật lại dinh dưỡng tổng cho meal
      await mealModel.updateMealNutrition(mealId);
      return res.status(200).json({ message: 'Food added successfully' });
    } else {
      return res.status(400).json({ message: 'Food already exists in this meal' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xóa món ăn khỏi meal
const removeFoodFromMeal = async (req, res) => {
  const { mealId, foodId } = req.params; // Lấy mealId và foodId từ params

  try {
    // Xoá món ăn khỏi meal
    await mealModel.removeFoodFromMeal(mealId, foodId);
    // Cập nhật lại dinh dưỡng tổng cho meal
    await mealModel.updateMealNutrition(mealId);
    return res.status(200).json({ message: 'Food removed successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update size hay portion của món ăn
const updatePortionSize = async (req, res) => {
  const { mealId, foodId } = req.params; // Lấy mealId và foodId từ params
  const { portion, size } = req.body; // Lấy portion và size từ body

  try {
    // Cập nhật portion và size của món ăn
    await mealModel.updateFoodInMeal(mealId, foodId, portion, size);
    // Cập nhật lại dinh dưỡng tổng cho meal
    await mealModel.updateMealNutrition(mealId);
    return res.status(200).json({ message: 'Update successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Xem chỉ số có trong meal
const getNutrition = async (req, res) => {
  try {
    // Xoá món ăn khỏi meal
    const nutritions = await mealModel.getTotalNutrition();
    res.json(nutritions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Xem chỉ số có trong meal theo mealID
const getNutritionbyid = async (req, res) => {
  try {
    const {mealId} = req.params;
    const nutritions = await mealModel.getNutritionbyID(mealId);
    res.json(nutritions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFoodToMeal,
  removeFoodFromMeal,
  updatePortionSize,
  getNutrition,
  getNutritionbyid
};

