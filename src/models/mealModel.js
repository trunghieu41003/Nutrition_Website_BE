const connection = require('../config/database');


// Thêm một thực phẩm vào bữa ăn
const insertFoodInMeal = (foodId, ListFood_ID, portion, size) => {
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
const removeFoodFromMeal = (foodId, ListFood_ID) => {
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


/*// Kiểm tra xem món ăn đã tồn tại trong bữa ăn hay chưa
const checkFoodInMeal = (foodId, diaryId, ListFoodId) => {
  const query = `
    SELECT COUNT(*) AS count
    FROM ListFood_food lff
    JOIN Diary_ListFood dl ON lff.ListFood_ID = dl.ListFood_ID
    JOIN ListFood lf ON lf.ListFood_id = lf.ListFood_id
    WHERE lff.food_id = ? AND dl.diary_id = ? AND lf.ListFood_id = ?
  `;
  
  return new Promise((resolve, reject) => {
    connection.query(query, [foodId, diaryId, ListFoodId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0].count > 0); // Trả về true nếu món ăn tồn tại, ngược lại false
      }
    });
  });
};*/

const updateMealNutrition = (ListFoodId) => {
  const updateQuery = `
    UPDATE ListFood lf
    SET 
      lf.ListFood_calories = (
        SELECT 
          COALESCE(SUM((f.calories * lff.size) / f.serving_size * lff.portion), 0)
        FROM ListFood_food lff
        JOIN Food f ON lff.food_id = f.food_id
        WHERE lf.ListFood_id = ?
      ),
      lf.ListFood_carbs = (
        SELECT 
          COALESCE(SUM((f.carbs * lff.size) / f.serving_size * lff.portion), 0)
        FROM ListFood_food lff
        JOIN Food f ON lff.food_id = f.food_id
        WHERE lf.ListFood_id = ?
      ),
      lf.ListFood_protein = (
        SELECT 
          COALESCE(SUM((f.protein * lff.size) / f.serving_size * lff.portion), 0)
        FROM ListFood_food lff
        JOIN Food f ON lff.food_id = f.food_id
        WHERE lf.ListFood_id = ?
      ),
      lf.ListFood_fat = (
        SELECT 
          COALESCE(SUM((f.fat * lff.size) / f.serving_size * lff.portion), 0)
        FROM ListFood_food lff
        JOIN Food f ON lff.food_id = f.food_id
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



const updateDiaryNutrition = (diaryId) => {
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
// Lấy tổng giá trị dinh dưỡng của tất cả bữa ăn trong 1 ngày
const getTotalNutrition = (diaryId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        SUM(ListFood_calories) AS total_calories,
        SUM(ListFood_carbs) AS total_carbs,
        SUM(ListFood_protein) AS total_protein,
        SUM(ListFood_fat) AS total_fat
      FROM ListFood l JOIN diary_listFood dl on l.ListFood_id = dl.ListFood_id
      WHERE dl.diary_id = ?;
    `;
    connection.query(query, [diaryId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Trả về hàng đầu tiên chứa tổng dinh dưỡng
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
        resolve(results[0].ListFood_ID);
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

module.exports = {
  insertFoodInMeal,
  removeFoodFromMeal,
  updateMealNutrition,
  updateDiaryNutrition,
  updateFoodNutrition,

  getTotalNutrition,
  getListFoodByID,

  findListFood,
  getFoodByID,

  UpdatePortionSize 

  //checkFoodInMeal,
};
