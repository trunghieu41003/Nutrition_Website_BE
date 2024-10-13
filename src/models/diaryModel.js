const connection = require('../config/database');

// Cập nhật giá trị tổng dinh dưỡng tiêu thụ (calories, carbs, protein, fat) của diary
const updateDiaryNutrition = (diaryId) => {
  const updateQuery = `
    UPDATE diary d
    SET 
      d.calories_consumed = (
        SELECT COALESCE(SUM(m.meal_calories), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = d.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      ),
      d.carbs_consumed = (
        SELECT COALESCE(SUM(m.meal_carbs), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = dm.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      ),
      d.protein_consumed = (
        SELECT COALESCE(SUM(m.meal_protein), 0) 
        FROM diary_meal dm
        JOIN meals m ON m.meal_id = dm.meal_id
        WHERE dm.diary_id = d.diary_id
        AND d.diary_id = ?
      ),
      d.fat_consumed = (
        SELECT COALESCE(SUM(m.meal_fat), 0) 
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

// Lưu dinh dưỡng cần nạp theo chế độ vào bảng Diary
const saveDiaryEntry = (userId, adjustedTDEE, macros) => {
  return new Promise((resolve, reject) => {
      const { protein, carbs, fat } = macros;
      const query = `
      INSERT INTO Diary (date, calories_remaining, protein_remaining, carbs_remaining, fat_remaining, user_id)
      VALUES (CURDATE(), ?, ?, ?, ?, ?)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  `;
    connection.query(query, [adjustedTDEE, protein, carbs, fat, userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


// Tạo mới 1 diary khi người dùng nhập date mới
const newDiary = (date) => {
  return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO Diary (date)
      VALUES (?)
  `;
    connection.query(query, [date], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Tạo mới 1 diary khi người dùng nhập date mới
const showDiarybyDate = (date) => {
  return new Promise((resolve, reject) => {
      const query = `
      SELECT * FROM Diary WHERE date = ?;
  `;
    connection.query(query, [date], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


module.exports = {
  updateDiaryNutrition,
  saveDiaryEntry,
  newDiary,
  showDiarybyDate
};
