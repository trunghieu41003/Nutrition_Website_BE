// src/controllers/mealController.js
const mealModel = require('../models/myMealModel');
const userModel = require('../models/userModel');
const TDEEService = require('../services/TDEEService');
const goalModel = require('../models/goalModel');
//Thêm 1 món ăn vào meal
const addFoodToMeal = async (req, res) => {
  const { mealId } = req.params;
  const { userId, date, foodId, portion, size } = req.body; 

  try {
    const diary = await mealModel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    console.log({diaryId});
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    console.log({diaryId, ListFoodId});
    await mealModel.insertFoodInList(foodId, ListFoodId, portion, size);
    await mealModel.updateFoodNutrition(ListFoodId, foodId);
    await mealModel.updateListFoodNutrition(ListFoodId);
    await mealModel.updateNutritionConsumed(diaryId);
    await mealModel.decreaseNutritionRemain(ListFoodId,foodId,diaryId);
    const updatedListFood = await mealModel.getListFoodByID(ListFoodId);
    
    return res.status(200).json({
      message: 'Add successfully',
      updatedListFood: updatedListFood 
    });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Xóa 1 món ăn khỏi meal
const removeFoodFromMeal = async (req, res) => {
  const { mealId, foodId  } = req.params;
  const {userId, date} = req.body;
  try {
    const diary = await mealModel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    await mealModel.increaseNutritionRemain(ListFoodId, foodId, diaryId);
    await mealModel.removeFoodFromList(foodId, ListFoodId);
    await mealModel.updateListFoodNutrition(ListFoodId);
    await mealModel.updateNutritionConsumed(diaryId);
    const mealNutritions = await mealModel.getListFoodByID(ListFoodId);
    return res.status(200).json({ message: 'Remove successfully', mealNutritions});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update size hay portion của món ăn
const updatePortionSize = async (req, res) => {
  const { mealId, foodId }= req.params; 
  const { userId, date, portion, size } = req.body; 

  try {
    const diary = await mealModel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    const food = await mealModel.getFoodByID(foodId, ListFoodId);
    const calories_before = food.calories;
    console.log(calories_before);
    await mealModel.increaseNutritionRemain(ListFoodId, foodId, diaryId);
    await mealModel.UpdatePortionSize(portion, size, foodId, ListFoodId);
    await mealModel.updateFoodNutrition(ListFoodId, foodId);
    await mealModel.updateListFoodNutrition(ListFoodId);
    await mealModel.updateNutritionConsumed(diaryId);
    const foodtemp = await mealModel.getFoodByID(foodId, ListFoodId);
    const calories_after = foodtemp.calories;
    console.log(calories_after);
    await mealModel.decreaseNutritionRemain(ListFoodId, foodId, diaryId);
    const foodNutrition = await mealModel.getFoodByID(foodId,ListFoodId);
    return res.status(200).json({ message: 'Update successfully', foodNutrition });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy ra dinh dưỡng meal theo ID
const getNutritionById = async (req, res) => {
  const { mealId } = req.params; 
  
  try {
    const {userId, date} = req.body;
    const diary = await mealModel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    const mealNutritions = await mealModel.getListFoodByID(ListFoodId);
    return res.status(200).json({mealNutritions});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Lấy ra dinh dưỡng food 
const getfoodInformation= async (req, res) => {
  const { mealId, foodId} = req.params;
  const {userId, date} = req.body;
  try {
    const diary = await mealModel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const ListFoodId = await mealModel.findListFood(diaryId, mealId);
    const foodNutrition = await mealModel.getFoodByID(foodId,ListFoodId);
    return res.status(200).json({foodNutrition});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Thêm mới 1 diary
const addNewDiary= async (req, res) => {
  const {date, userId} = req.body;
  try {
    const newdiary = await mealModel.newDiary(date, userId);
    const user = await userModel.findUserByID(userId);
    const goal = await goalModel.findGoalbyUser(userId);
    const goalId = goal.goal_id;
    console.log({diaryId:newdiary.diaryId, user:user, goal:goal, goalId: goalId});
    await TDEEService.updateUserTDEEAndDiary(userId, newdiary.diaryId, user, goal, goalId);
    const diary = await mealModel.getDiary(date,userId);
    return res.status(200).json({ message: 'Add successfully ',diary});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getDiary = async (req, res) => {
  const {date, userId} = req.body;
  try {
    const diary = await mealModel.getDiary(date, userId);
    return res.status(200).json({diary});
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
  addNewDiary,
  getDiary
};
