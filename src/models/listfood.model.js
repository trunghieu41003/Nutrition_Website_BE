const connection = require('../config/database');

// Thêm một thực phẩm vào bữa ăn
const insertFoodInList = (foodId, ListFood_ID, portion, size) => {
  const insertQuery = `
    INSERT INTO ListFood_food (food_id, ListFood_ID, portion, size)
    VALUES (?, ?, ?, ?)
  `;
  return new Promise((resolve, reject) => {
    connection.query(insertQuery, [foodId, ListFood_ID, portion, size], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Xóa một thực phẩm khỏi bữa ăn với ListFood_ID được truyền trực tiếp
const removeFoodFromList = (foodId, ListFood_ID) => {
  const deleteQuery = `
    DELETE FROM ListFood_food
    WHERE food_id = ? AND ListFood_Id = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(deleteQuery, [foodId, ListFood_ID], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateListFoodNutrition = (ListFoodId) => {
  const updateQuery = `
    UPDATE ListFood lf
    SET 
      lf.ListFood_calories = (
        SELECT 
          COALESCE(SUM(lff.calories), 0)
        FROM ListFood_food lff
        WHERE lff.ListFood_id = ?
      ),
      lf.ListFood_carbs = (
        SELECT 
          COALESCE(SUM(lff.carbs), 0)
        FROM ListFood_food lff
        WHERE lff.ListFood_id = ?
      ),
      lf.ListFood_protein = (
        SELECT 
          COALESCE(SUM(lff.protein), 0)
        FROM ListFood_food lff
        WHERE lff.ListFood_id = ?
      ),
      lf.ListFood_fat = (
        SELECT 
          COALESCE(SUM(lff.fat), 0)
        FROM ListFood_food lff
        WHERE lff.ListFood_id = ?
      )
    WHERE lf.ListFood_ID = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [ListFoodId, ListFoodId, ListFoodId, ListFoodId, ListFoodId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateFoodNutrition = (ListFoodId, foodId) => {
  const updateQuery = `
    UPDATE ListFood_food lff
JOIN Food f ON lff.food_id = f.food_id
SET 
  lff.calories = COALESCE(((f.calories * lff.size / f.serving_size) * lff.portion), 0),
  lff.carbs = COALESCE(((f.carbs * lff.size / f.serving_size) * lff.portion), 0),
  lff.protein = COALESCE(((f.protein * lff.size) / f.serving_size) * lff.portion, 0),
  lff.fat = COALESCE(((f.fat * lff.size) / f.serving_size) * lff.portion, 0)
WHERE lff.ListFood_ID = ? AND lff.food_id = ?;

  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [ListFoodId, foodId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Lấy dinh dưỡng của một danh sách theo ID
const getAllFoodByDate = (diaryId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT lff .*, f.name_food, m.name, m.meal_id
        FROM ListFood_food lff Join Food f on lff.food_id = f.food_id
        JOIN ListFood lf ON lff.ListFood_id = lf.ListFood_id
        JOIN Meal m ON m.meal_id = lf.meal_id
        JOIN diary_listfood dl ON dl.ListFood_ID = lf.ListFood_ID
        JOIN diary d ON d.diary_id=dl.diary_id
        WHERE d.diary_id= ?
    `;
    connection.query(query, [diaryId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results); // Trả về hàng đầu tiên chứa dinh dưỡng của bữa ăn
      }
    });
  });
};

const findListFood = (diaryId, mealId) => {
  return new Promise((resolve, reject) => {
    const query = `
  SELECT *
  FROM Diary_ListFood dl
  JOIN ListFood lf ON dl.ListFood_ID = lf.ListFood_ID
  JOIN Meal m ON lf.meal_id = m.meal_id
  WHERE dl.diary_id = ? AND m.meal_id = ?
    `;
    connection.query(query, [diaryId, mealId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};


const getFoodByID = (foodId, ListFoodId) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT lff.*, m.name, f.name_food, m.meal_id
        FROM ListFood_food lff
        JOIN Food f ON lff.food_id = f.food_id
        JOIN ListFood lf ON lf.ListFood_ID = lff.ListFood_ID
        JOIN Meal m ON m.meal_id = lf.meal_id
        WHERE lff.ListFood_ID = ? AND lff.food_id = ?;

    `;
    connection.query(query, [ListFoodId, foodId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results[0]);
      }
    });
  });
};

const UpdatePortionSize = (portion, size, foodId, ListFoodId) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE ListFood_food
      SET portion = ?, size = ?
      WHERE food_id = ? AND ListFood_id = ?;
    `;
    connection.query(query, [portion, size, foodId, ListFoodId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
};


const findFoodIdByDiaryId = (diaryId) => {
  return new Promise((resolve, reject) => {
    const query = `
      Select lff.food_id From diary_ListFood dl Join 
      Listfood_food lff on dl.ListFood_id = lff.ListFood_id
      Where dl.diary_id = ?
  `;
    connection.query(query, [diaryId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  insertFoodInList,
  removeFoodFromList,
  updateListFoodNutrition,
  updateFoodNutrition,
  getAllFoodByDate,
  findListFood,
  getFoodByID,
  UpdatePortionSize,
  findFoodIdByDiaryId,
};