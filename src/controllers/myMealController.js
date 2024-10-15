// src/controllers/mealController.js
const mealModel = require('../models/myMealModel');
const userModel = require('../models/userModel');
const TDEEService = require('../services/TDEEService');
const goalModel = require('../models/goalModel');
//Thêm 1 món ăn vào meal
const addFoodToMeal = async (req, res) => {
  const { mealId, foodId, diaryId } = req.params;
  const { portion, size } = req.body; 

  try {
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    await mealModel.insertFoodInList(foodId, ListFoodId, portion, size);
    await mealModel.updateFoodNutrition(ListFoodId, foodId);
    await mealModel.updateListFoodNutrition(ListFoodId);
    await mealModel.updateNutritionConsumed(diaryId);
    await mealModel.updateNutritionRemain(diaryId, ListFoodId, foodId);
    const updatedListFood = await mealModel.getListFoodByID(ListFoodId);
    
    return res.status(200).json({
      message: 'Food added successfully',
      updatedListFood: updatedListFood 
    });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Xóa 1 món ăn khỏi meal
const removeFoodFromMeal = async (req, res) => {
  const { mealId, foodId, diaryId  } = req.params;
  const ListFoodId = await mealModel.findListFood(diaryId, mealId);
  try {
    await mealModel.removeFoodFromList(foodId, ListFoodId);
    await mealModel.updateListFoodNutrition(ListFoodId);
    await mealModel.updateNutritionConsumed(diaryId);
    await mealModel.updateNutritionRemain(diaryId, ListFoodId, foodId);
    return res.status(200).json({ message: 'Food removed successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update size hay portion của món ăn
const updatePortionSize = async (req, res) => {
  const { mealId, foodId, diaryId } = req.params; 
  const { portion, size } = req.body; 

  try {
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    await mealModel.UpdatePortionSize(portion, size, foodId, ListFoodId);
    await mealModel.updateFoodNutrition(ListFoodId, foodId);
    await mealModel.updateListFoodNutrition(ListFoodId);
    await mealModel.updateNutritionConsumed(diaryId);
    await mealModel.updateNutritionRemain(diaryId, ListFoodId, foodId);
    return res.status(200).json({ message: 'Update successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy ra dinh dưỡng meal theo ID
const getNutritionById = async (req, res) => {
  const { diaryId, mealId } = req.params; 
  const ListFoodId = await mealModel.findListFood(diaryId, mealId);
  try {
    const nutritions = await mealModel.getListFoodByID(ListFoodId);
    res.json(nutritions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Lấy ra dinh dưỡng food 
const getfoodInformation= async (req, res) => {
  const { mealId, foodId, diaryId } = req.params;
  try {
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    const foodNutrition = await mealModel.getFoodByID(foodId,ListFoodId);
    return res.status(200).json({ message: 'Get Successfully ', food: foodNutrition});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Thêm mới 1 diary
const addNewDiary= async (req, res) => {
  const { userId } = req.params; 
  const date = req.body;
  try {
    const newdiary = await mealModel.newDiary(date, userId);
    const user = await userModel.findUserByID(userId);
    const goal = await goalModel.findGoalbyUser(userId);
    const goalId = goal.map(goal => goal.goal_id);
    await TDEEService.updateUserTDEEAndDiary(newdiary.diaryId, userId, user, goal, goalId);

    return res.status(200).json({ message: 'Add Successfully '});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addFoodToMeal,
  removeFoodFromMeal,
  updatePortionSize,
  getNutritionById,
  getfoodInformation,
  addNewDiary
};
