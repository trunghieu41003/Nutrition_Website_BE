// src/models/mealModel.js
const connection = require('../config/database');

// Hàm để thêm hoặc xóa thực phẩm trong bữa ăn và cập nhật tổng calories, carbs, protein, fat
const manageFoodInMeal = (mealId, foodId, action) => {
  return new Promise((resolve, reject) => {
    if (action === 'add') {
      // Kiểm tra xem bản ghi đã tồn tại hay chưa
      const checkQuery = 'SELECT * FROM meal_food WHERE meal_id = ? AND food_id = ?';
      connection.query(checkQuery, [mealId, foodId], (checkErr, checkResults) => {
        if (checkErr) {
          return reject(checkErr);
        }

        // Nếu không có bản ghi nào, tiến hành thêm
        if (checkResults.length === 0) {
          const insertQuery = 'INSERT INTO meal_food (meal_id, food_id) VALUES (?, ?)';
          connection.query(insertQuery, [mealId, foodId], (insertErr, insertResults) => {
            if (insertErr) {
              return reject(insertErr); // Ngừng nếu có lỗi trong insert
            }

            // Cập nhật tổng calories, carbs, protein, fat
            const updateQuery = `
              UPDATE meals m
              SET 
                m.total_calories = (
                  SELECT COALESCE(SUM(f.calories), 0) 
                  FROM meal_food mf
                  JOIN foods f ON f.food_id = mf.food_id
                  WHERE mf.meal_id = m.meal_id
                  AND m.meal_id = ?
                ),
                m.total_carbs = (
                  SELECT COALESCE(SUM(f.carbs), 0) 
                  FROM meal_food mf
                  JOIN foods f ON f.food_id = mf.food_id
                  WHERE mf.meal_id = m.meal_id
                  AND m.meal_id = ?
                ),
                m.total_protein = (
                  SELECT COALESCE(SUM(f.protein), 0) 
                  FROM meal_food mf
                  JOIN foods f ON f.food_id = mf.food_id
                  WHERE mf.meal_id = m.meal_id
                  AND m.meal_id = ?
                ),
                m.total_fat = (
                  SELECT COALESCE(SUM(f.fat), 0) 
                  FROM meal_food mf
                  JOIN foods f ON f.food_id = mf.food_id
                  WHERE mf.meal_id = m.meal_id
                  AND m.meal_id = ?
                )
              WHERE m.meal_id = ?;
            `;
            connection.query(updateQuery, [mealId, mealId, mealId, mealId, mealId], (updateErr, updateResults) => {
              if (updateErr) {
                return reject(updateErr); // Ngừng nếu có lỗi trong update
              }
              resolve({ message: 'Food added successfully', insertResults, updateResults }); // Trả về kết quả
            });
          });
        } else {
          // Nếu bản ghi đã tồn tại
          resolve({ message: 'Food already exists in this meal' });
        }
      });
    } else if (action === 'remove') {
      // Xóa thực phẩm khỏi bữa ăn
      const deleteQuery = 'DELETE FROM meal_food WHERE meal_id = ? AND food_id = ?';
      connection.query(deleteQuery, [mealId, foodId], (deleteErr, deleteResults) => {
        if (deleteErr) {
          return reject(deleteErr); // Ngừng nếu có lỗi trong delete
        }

        // Cập nhật tổng calories, carbs, protein, fat sau khi xóa
        const updateQuery = `
          UPDATE meals m
          SET 
            m.total_calories = (
              SELECT COALESCE(SUM(f.calories), 0)
              FROM meal_food mf
              JOIN foods f ON f.food_id = mf.food_id
              WHERE mf.meal_id = m.meal_id
              AND m.meal_id = ?
            ),
            m.total_carbs = (
              SELECT COALESCE(SUM(f.carbs), 0)
              FROM meal_food mf
              JOIN foods f ON f.food_id = mf.food_id
              WHERE mf.meal_id = m.meal_id
              AND m.meal_id = ?
            ),
            m.total_protein = (
              SELECT COALESCE(SUM(f.protein), 0)
              FROM meal_food mf
              JOIN foods f ON f.food_id = mf.food_id
              WHERE mf.meal_id = m.meal_id
              AND m.meal_id = ?
            ),
            m.total_fat = (
              SELECT COALESCE(SUM(f.fat), 0)
              FROM meal_food mf
              JOIN foods f ON f.food_id = mf.food_id
              WHERE mf.meal_id = m.meal_id
              AND m.meal_id = ?
            )
          WHERE m.meal_id = ?;
        `;
        connection.query(updateQuery, [mealId, mealId, mealId, mealId, mealId], (updateErr, updateResults) => {
          if (updateErr) {
            return reject(updateErr); // Ngừng nếu có lỗi trong update
          }
          resolve({ message: 'Food removed successfully', deleteResults, updateResults });
        });
      });
    } else {
      reject(new Error('Invalid action'));
    }
  });
};

// Hàm để lấy tổng dinh dưỡng của tất cả bữa ăn (meals)
const getTotalNutrition = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        SUM(m.total_calories) AS total_calories,
        SUM(m.total_carbs) AS total_carbs,
        SUM(m.total_protein) AS total_protein,
        SUM(m.total_fat) AS total_fat
      FROM meals m
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject(err); // Trả về lỗi nếu có
      } else {
        resolve(results[0]); // Trả về kết quả (dòng đầu tiên chứa tổng dinh dưỡng)
      }
    });
  });
};

module.exports = {
  manageFoodInMeal,
  getTotalNutrition
};
