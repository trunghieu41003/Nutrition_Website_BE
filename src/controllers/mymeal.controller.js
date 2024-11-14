// src/controllers/mealController.js
const diarymodel = require('../models/diary.model');
const usermodel = require('../models/user.model');
const foodmodel = require('../models/food.model');
const listfoodmodel = require('../models/listfood.model');
const TDEEService = require('../services/TDEEService');
const goalmodel = require('../models/goal.model');


//Thêm 1 món ăn vào meal
const addFoodToMeal = async (req, res) => {
  const { mealId } = req.params;
  const { userId, date, foodId, portion, size } = req.body;

  try {
    const diary = await diarymodel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    console.log({ diaryId });
    const ListFood = await listfoodmodel.findListFood(diaryId, mealId);
    const ListFoodId = ListFood.ListFood_ID;
    console.log({ diaryId, ListFoodId });
    await listfoodmodel.insertFoodInList(foodId, ListFoodId, portion, size);
    await listfoodmodel.updateFoodNutrition(ListFoodId, foodId);
    await listfoodmodel.updateListFoodNutrition(ListFoodId);
    await diarymodel.updateNutritionConsumed(diaryId);
    await diarymodel.decreaseNutritionRemain(ListFoodId, foodId, diaryId);
    const food = await listfoodmodel.getAllFoodByDate(ListFoodId);

    return res.status(200).json({
      message: 'Add successfully',
      food: food
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Xóa 1 món ăn khỏi meal
const removeFoodFromMeal = async (req, res) => {
  const { mealId, foodId } = req.params;
  const { userId, date } = req.body;
  try {
    const diary = await diarymodel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const ListFood = await listfoodmodel.findListFood(diaryId, mealId);
    const ListFoodId = ListFood.ListFood_ID;
    await diarymodel.increaseNutritionRemain(ListFoodId, foodId, diaryId);
    await listfoodmodel.removeFoodFromList(foodId, ListFoodId);
    await listfoodmodel.updateListFoodNutrition(ListFoodId);
    await diarymodel.updateNutritionConsumed(diaryId);
    const food = await listfoodmodel.getFoodByID(foodId, ListFoodId);
    return res.status(200).json({ message: 'Remove successfully', food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update size hay portion của món ăn
const updatePortionSize = async (req, res) => {
  const { mealId, foodId } = req.params;
  const { userId, date, portion, size } = req.body;

  try {
    const diary = await diarymodel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const ListFood = await listfoodmodel.findListFood(diaryId, mealId);
    const ListFoodId = ListFood.ListFood_ID;
    const food = await listfoodmodel.getFoodByID(foodId, ListFoodId);
    const calories_before = food.calories;
    console.log(calories_before);
    await diarymodel.increaseNutritionRemain(ListFoodId, foodId, diaryId);
    await listfoodmodel.UpdatePortionSize(portion, size, foodId, ListFoodId);
    await listfoodmodel.updateFoodNutrition(ListFoodId, foodId);
    await listfoodmodel.updateListFoodNutrition(ListFoodId);
    await diarymodel.updateNutritionConsumed(diaryId);
    const foodtemp = await listfoodmodel.getFoodByID(foodId, ListFoodId);
    const calories_after = foodtemp.calories;
    console.log(calories_after);
    await diarymodel.decreaseNutritionRemain(ListFoodId, foodId, diaryId);
    const foodNutrition = await listfoodmodel.getFoodByID(foodId, ListFoodId);
    return res.status(200).json({ message: 'Update successfully', foodNutrition });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Lấy ra dinh dưỡng meal theo Date
const getNutritionByDate = async (req, res) => {
  const { userId, date } = req.query;
  try {
    const diary = await diarymodel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    const food = await listfoodmodel.getAllFoodByDate(diaryId);
    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Lấy ra dinh dưỡng food 
const getfoodInformation = async (req, res) => {
  const { mealId, foodId } = req.params;
  const { userId, date } = req.query;
  try {
    const diary = await diarymodel.getDiary(date, userId);
    const diaryId = diary.diary_id;
    if (!diaryId) console.log('nodiary');
    console.log(diaryId);
    const ListFood = await listfoodmodel.findListFood(diaryId, mealId);
    const ListFoodId = ListFood.ListFood_ID;
    const food = await listfoodmodel.getFoodByID(foodId, ListFoodId);
    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Thêm mới 1 diary
const addNewDiary = async (req, res) => {
  const { date, userId } = req.body;
  try {
    const existingDiary = await diarymodel.getDiary(date, userId);
    if (existingDiary) return res.status(400).json({ 'This user have already this diary': existingDiary });
    console.log({ date });
    const newdiary = await diarymodel.newDiary(date, userId);
    const user = await usermodel.findUserByID(userId);
    const goal = await goalmodel.findGoalbyUser(userId);
    const goalId = goal.goal_id;
    await TDEEService.updateUserTDEEAndDiary(userId, newdiary.diaryId, user, goal, goalId);
    const diary = await diarymodel.getDiary(date, userId);
    return res.status(200).json({ message: 'Add successfully ', diary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const getAllFood = async (req, res) => {
  const { foodId } = req.params;
  try {
    const food = await foodmodel.getAllFood(foodId);
    return res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addFoodToMeal,
  removeFoodFromMeal,
  updatePortionSize,
  getNutritionByDate,
  getfoodInformation,
  addNewDiary,

  getAllFood
};
