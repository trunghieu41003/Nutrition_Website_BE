const connection = require('../config/database');

// Check if a food exists in a meal
const checkFoodInMeal = (mealId, foodId) => {
  const checkQuery = 'SELECT * FROM meal_food WHERE meal_id = ? AND food_id = ?';
  return new Promise((resolve, reject) => {
    connection.query(checkQuery, [mealId, foodId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Insert a food into a meal
const insertFoodInMeal = (mealId, foodId, portion, size) => {
  const insertQuery = 'INSERT INTO meal_food (meal_id, food_id, portion, size) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    connection.query(insertQuery, [mealId, foodId, portion, size], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Delete a food from a meal
const removeFoodFromMeal = (mealId, foodId) => {
  const deleteQuery = 'DELETE FROM meal_food WHERE meal_id = ? AND food_id = ?';
  return new Promise((resolve, reject) => {
    connection.query(deleteQuery, [mealId, foodId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Update size and portion for a food in a meal
const updateFoodInMeal = (mealId, foodId, portion, size) => {
  const updateQuery = 'UPDATE meal_food SET portion = ?, size = ? WHERE meal_id = ? AND food_id = ?';
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [portion, size, mealId, foodId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Update meal's total nutrition values (calories, carbs, protein, fat)
const updateMealNutrition = (mealId) => {
  const updateQuery = `
    UPDATE meals m
    SET 
      m.total_meal_calories = (
        SELECT COALESCE(SUM((mf.size * f.calories) / f.serving_size * mf.portion), 0)
        FROM meal_food mf
        JOIN foods f ON f.food_id = mf.food_id
        WHERE mf.meal_id = m.meal_id
        AND m.meal_id = ?
      ),
      m.total_meal_carbs = (
        SELECT COALESCE(SUM((mf.size * f.carbs) / f.serving_size * mf.portion), 0)
        FROM meal_food mf
        JOIN foods f ON f.food_id = mf.food_id
        WHERE mf.meal_id = m.meal_id
        AND m.meal_id = ?
      ),
      m.total_meal_protein = (
        SELECT COALESCE(SUM((mf.size * f.protein) / f.serving_size * mf.portion), 0)
        FROM meal_food mf
        JOIN foods f ON f.food_id = mf.food_id
        WHERE mf.meal_id = m.meal_id
        AND m.meal_id = ?
      ),
      m.total_meal_fat = (
        SELECT COALESCE(SUM((mf.size * f.fat) / f.serving_size * mf.portion), 0)
        FROM meal_food mf
        JOIN foods f ON f.food_id = mf.food_id
        WHERE mf.meal_id = m.meal_id
        AND m.meal_id = ?
      )
    WHERE m.meal_id = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(updateQuery, [mealId, mealId, mealId, mealId, mealId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const getTotalNutrition = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        SUM(m.total_meal_calories) AS total_calories,
        SUM(m.total_meal_carbs) AS total_carbs,
        SUM(m.total_meal_protein) AS total_protein,
        SUM(m.total_meal_fat) AS total_fat
      FROM meals;
    `;
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Return the first row containing the total nutrition
      }
    });
  });
};

const getNutritionbyID = (mealId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        name,
        total_meal_calories AS total_calories,
        total_meal_carbs AS total_carbs,
        total_meal_protein AS total_protein,
        total_meal_fat AS total_fat
      FROM meals
      WHERE meal_id = ?;
    `;
    connection.query(query,[mealId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Return the first row containing the total nutrition
      }
    });
  });
};


module.exports = {
  checkFoodInMeal,
  insertFoodInMeal,
  removeFoodFromMeal,
  getTotalNutrition,
  updateFoodInMeal,
  updateMealNutrition,
  getNutritionbyID
};
