const connection = require('../config/database');

// Cập nhật giá trị tổng dinh dưỡng (calories, carbs, protein, fat) của diary
const updateDiaryNutrition = (diaryId) => {
  const updateQuery = `
    UPDATE diary d
    SET 
      d.total_diary_calories = (
        SELECT COALESCE(SUM(m.total_calories), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = dm.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      ),
      d.total_diary_carbs = (
        SELECT COALESCE(SUM(m.total_carbs), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = dm.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      ),
      d.total_diary_protein = (
        SELECT COALESCE(SUM(m.total_protein), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = dm.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      ),
      d.total_diary_fat = (
        SELECT COALESCE(SUM(m.total_fat), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = dm.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      )
    WHERE d.diary_id = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [diaryId, diaryId, diaryId, diaryId, diaryId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  updateDiaryNutrition
};
