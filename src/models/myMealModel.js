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
    WHERE food_id = ? AND ListFood_ID = ?;
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
        WHERE lf.ListFood_id = ?
      ),
      lf.ListFood_carbs = (
        SELECT 
          COALESCE(SUM(lff.carbs), 0)
        FROM ListFood_food lff
        WHERE lf.ListFood_id = ?
      ),
      lf.ListFood_protein = (
        SELECT 
          COALESCE(SUM(lff.protein), 0)
        FROM ListFood_food lff
        WHERE lf.ListFood_id = ?
      ),
      lf.ListFood_fat = (
        SELECT 
          COALESCE(SUM(lff.fat), 0)
        FROM ListFood_food lff
        WHERE lf.ListFood_id = ?
      )
    WHERE lf.ListFood_ID = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [ListFoodId,ListFoodId,ListFoodId,ListFoodId,ListFoodId], (err, results) => {
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
      lff.calories = COALESCE(((f.calories * lff.size) / f.serving_size * lff.portion), 0),
      lff.carbs = COALESCE(((f.carbs * lff.size) / f.serving_size * lff.portion), 0),
      lff.protein = COALESCE(((f.protein * lff.size) / f.serving_size * lff.portion), 0),
      lff.fat = COALESCE(((f.fat * lff.size) / f.serving_size * lff.portion), 0)
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

const updateNutritionConsumed = (diaryId) => {
  const updateQuery = `
    UPDATE diary 
    SET 
      calories_consumed = (
        SELECT 
          COALESCE(SUM(ListFood_calories), 0)
        FROM diary_listFood dl Join ListFood lf on dl.ListFood_ID = lf.ListFood_ID
        WHERE diary_id = ?
      ),
      carbs_consumed = (
        SELECT 
          COALESCE(SUM(ListFood_carbs), 0)
        FROM diary_listFood dl Join ListFood lf on dl.ListFood_ID = lf.ListFood_ID
        WHERE diary_id = ?
      ),
      protein_consumed = (
        SELECT 
          COALESCE(SUM(ListFood_protein), 0)
        FROM diary_listFood dl Join ListFood lf on dl.ListFood_ID = lf.ListFood_ID
        WHERE diary_id = ?
      ),
      fat_consumed = (
        SELECT 
          COALESCE(SUM(ListFood_fat), 0)
        FROM diary_listFood dl Join ListFood lf on dl.ListFood_ID = lf.ListFood_ID
        WHERE diary_id = ?
      )
    WHERE diary_id = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [diaryId, diaryId, diaryId, diaryId, diaryId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateNutritionRemain = (diaryId, ListFoodId, foodId) => {
  const updateQuery = `
    UPDATE diary 
    SET 
      calories_remaining = (
        SELECT 
          COALESCE(calories_remaining - lff.calories, 0)
        FROM diary d Join diary_ListFood dl on d.diary_id = dl.diary_id
        Join ListFood_food lff on dl.ListFood_id = lff.ListFood_id
        WHERE lff.ListFood_id = ? AND lff.food_id = ? 
      ),
      carbs_remaining = (
         SELECT 
          COALESCE(carbs_remaining - lff.calories, 0)
        FROM diary d Join diary_ListFood dl on d.diary_id = dl.diary_id
        Join ListFood_food lff on dl.ListFood_id = lff.ListFood_id
        WHERE lff.ListFood_id = ? AND lff.food_id = ? 
      ),
      protein_remaining = (
         SELECT 
          COALESCE(protein_remaining - lff.calories, 0)
        FROM diary d Join diary_ListFood dl on d.diary_id = dl.diary_id
        Join ListFood_food lff on dl.ListFood_id = lff.ListFood_id
        WHERE lff.ListFood_id = ? AND lff.food_id = ? 
      ),
      fat_remaining = (
         SELECT 
          COALESCE(fat_remaining - lff.calories, 0)
        FROM diary d Join diary_ListFood dl on d.diary_id = dl.diary_id
        Join ListFood_food lff on dl.ListFood_id = lff.ListFood_id
        WHERE lff.ListFood_id = ? AND lff.food_id = ? 
      )
    WHERE diary_id = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [ ListFoodId, foodId, ListFoodId, foodId, ListFoodId, foodId, ListFoodId, foodId, diaryId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Lấy dinh dưỡng của một danh sách theo ID
const getListFoodByID = (ListFoodId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM ListFood
      WHERE ListFood_id = ?;
    `;
    connection.query(query, [ListFoodId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Trả về hàng đầu tiên chứa dinh dưỡng của bữa ăn
      }
    });
  });
};

const findListFood = (diaryId, mealId) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT lf.ListFood_ID
    FROM Diary_ListFood dl
    JOIN ListFood lf ON dl.ListFood_ID = lf.ListFood_ID
    JOIN Meal m ON lf.meal_id = m.meal_id
    WHERE dl.diary_id = ? AND m.meal_id = ?;
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
        SELECT *
        FROM ListFood_food 
        WHERE ListFood_id = ? AND food_id = ?
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

// Lưu dinh dưỡng cần nạp theo chế độ vào bảng Diary
const saveDiaryEntry = (diaryId, adjustedTDEE, macros) => {
  return new Promise((resolve, reject) => {
      const { protein, carbs, fat } = macros;
      const query = `
      Update diary set 
      calories_remaining = ?, 
      protein_remaining = ?,
      carbs_remaining = ?,
      fat_remaining =?
      where diary_id = ?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  `;
    connection.query(query, [adjustedTDEE, protein, carbs, fat, diaryId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


// Tạo mới 1 diary khi người dùng nhập date mới
const newDiary = (date, userId) => {
  return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO Diary (date, user_id)
      VALUES (?, ?)
  `;
    connection.query(query, [date, userId], (err, results) => {
      if (err) reject(err);
      else resolve({diaryId: results.insertId});
    });
  });
};

module.exports = {
  insertFoodInList,
  removeFoodFromList,
  updateListFoodNutrition,
  updateNutritionConsumed,
  updateNutritionRemain,
  updateFoodNutrition,
  getListFoodByID,
  findListFood,
  getFoodByID,
  UpdatePortionSize,
  saveDiaryEntry,
  newDiary 
};
