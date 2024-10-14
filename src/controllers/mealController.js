// src/controllers/mealController.js
const mealModel = require('../models/mealModel');

const addFoodToMeal = async (req, res) => {
  const { mealId, foodId, diaryId } = req.params; // Lấy mealId từ params
  const { portion, size } = req.body; // Lấy foodId, diaryId, portion và size từ body

  try {
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    // Thêm món ăn vào meal
    await mealModel.insertFoodInMeal(foodId, ListFoodId, portion, size);
    // Cập nhật lại dinh dưỡng tổng trong danh sách
    await mealModel.updateFoodNutrition(ListFoodId, foodId);
    await mealModel.updateMealNutrition(ListFoodId);
    await mealModel.updateDiaryNutrition(diaryId);
    // Truy vấn lấy dữ liệu của ListFood sau khi đã cập nhật
    const updatedListFood = await mealModel.getListFoodByID(ListFoodId);
    
    return res.status(200).json({
      message: 'Food added successfully',
      updatedListFood: updatedListFood // Trả về dữ liệu ListFood sau khi đã cập nhật
    });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Xóa món ăn khỏi meal
const removeFoodFromMeal = async (req, res) => {
  const { mealId, foodId, diaryId  } = req.params; // Lấy mealId từ params
  const ListFoodId = await mealModel.findListFood(diaryId, mealId);
  
  try {
    // Xoá món ăn khỏi meal
    await mealModel.removeFoodFromMeal(foodId, ListFoodId);
    // Cập nhật lại dinh dưỡng tổng cho meal
    await mealModel.updateMealNutrition(ListFoodId);
    await mealModel.updateDiaryNutrition(diaryId);
    return res.status(200).json({ message: 'Food removed successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update size hay portion của món ăn
const updatePortionSize = async (req, res) => {
  const { mealId, foodId, diaryId } = req.params; // Lấy mealId và foodId từ params
  const { portion, size } = req.body; // Lấy portion, size và diaryId từ body

  try {
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    // Cập nhật portion và size của món ăn
    await mealModel.UpdatePortionSize(portion, size, foodId, ListFoodId);
    // Cập nhật lại dinh dưỡng tổng cho meal
    await mealModel.updateMealNutrition(ListFoodId);
    await mealModel.updateDiaryNutrition(diaryId);
    return res.status(200).json({ message: 'Update successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Xem chỉ số dinh dưỡng tổng
const getNutrition = async (req, res) => {
  try {
    const { diaryId } = req.params;
    // Lấy tổng giá trị dinh dưỡng của tất cả bữa ăn
    const nutritions = await mealModel.getTotalNutrition(diaryId);
    res.json(nutritions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getNutritionById = async (req, res) => {
  const { diaryId, mealId } = req.params; // Lấy mealId từ params
  const ListFoodId = await mealModel.findListFood(diaryId, mealId);
  try {
    const nutritions = await mealModel.getListFoodByID(ListFoodId);
    res.json(nutritions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getfoodInformation= async (req, res) => {
  const { mealId, foodId, diaryId } = req.params; // Lấy mealId và foodId từ params
  try {
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);

    const foodNutrition = await mealModel.getFoodByID(foodId,ListFoodId);

    return res.status(200).json({ message: 'Get Successfully ', food: foodNutrition});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFoodToMeal,
  removeFoodFromMeal,
  updatePortionSize,
  getNutrition,
  getNutritionById,
  getfoodInformation
};
