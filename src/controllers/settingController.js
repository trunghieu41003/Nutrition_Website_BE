// src/controller/UserController.js
const UserModel = require('../models/userModel');
const goalModel = require('../models/goalModel');
const mealModel = require('../models/myMealModel');
const TDEEService = require('../services/TDEEService');

const updateUserInfo = async (req, res) => {
    const {userId} = req.params; 
    const userData = req.body; 
    const goalData = req.body;
  
    try {
      console.log('Received request to update user info for user ID:', userId); // Log initial request
      const goal = await goalModel.findGoalbyUser(userId);
      const user = await UserModel.findUserByID(userId);
      const goalId = goal.goal_id;
    
      // Update user information
      await UserModel.updateUserInformation(userId, userData);
      console.log('Updated user information for user ID:', userId); // Log successful user info update
      // Update user goals
      await goalModel.updateUserGoal(goalId, goalData);
      console.log('Updated user goals for goal IDs:', goalId); // Log successful goal update
      // Get user diary
      const diary = await UserModel.getUserDiary(userId);
      console.log('Retrieved diary entries for user ID:', userId, diary); // Log retrieved diary entries
  
      if (diary.length > 0) {
        // Loop through diary entries
        for(const diaryEntry of diary) {
          console.log('Processing diary entry ID:', diaryEntry.diary_id); // Log current diary entry being processed
  
          // Update TDEE and diary
          await TDEEService.updateUserTDEEAndDiary(userId,diaryEntry.diary_id, user, goal, goalId);
          console.log('Updated TDEE and diary for diary entry ID:', diaryEntry.diary_id); // Log TDEE update
  
          // Update nutrition consumed
          await mealModel.updateNutritionConsumed(diaryEntry.diary_id);
          console.log('Updated nutrition consumed for diary entry ID:', diaryEntry.diary_id); // Log nutrition update
  
          // Find food by diary ID
          const food = await mealModel.findFoodIdByDiaryId(diaryEntry.diary_id);
          console.log('Found food for diary entry ID:', diaryEntry.diary_id, food); // Log found food entries
  
          if (food.length > 0) {
            food.forEach(async (foodEntry) => {
              console.log('Decreasing nutrition for food ID:', foodEntry.foodId, 'in diary ID:', diaryEntry.diary_id); // Log decrease operation
              await mealModel.updateNutritionRemain(diaryEntry.diary_id);
            });
          }
        };
      }
      return res.status(200).json({ message: 'Update successfully', user });
    } catch (error) {
      console.error('Error updating user info for user ID:', userId, error); // Log error details
      return res.status(500).json({ error: error.message });
    }
  };
const getUserInfo = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await UserModel.findUserByID(userId);
      const goal = await goalModel.findGoalbyUser(userId);
      return res.status(200).json({user,goal});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};
module.exports = {
    updateUserInfo,
    getUserInfo
};