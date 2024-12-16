const connection = require('../config/database');

const getAllFood = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM food;
  `;
    connection.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const addFood = (foodData) => {
  return new Promise((resolve, reject) => {
    const {nameFood, fat, carbs, calories, protein, servingSize } = foodData;
    connection.query(
      'INSERT INTO food (name_food, fat, carbs, calories, protein, serving_size) VALUES (?, ?, ?, ?, ?, ?)',
      [nameFood, fat, carbs, calories, protein, servingSize],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      }
    );
  });
};

const updateFood = (foodData) => {
  return new Promise((resolve, reject) => {
    const {foodId, nameFood, fat, carbs, calories, protein, servingSize } = foodData;
    connection.query(
      'UPDATE food SET name_food = ?, fat = ?, carbs = ?, calories = ?, protein = ?, serving_size = ? WHERE food_id = ?',
      [nameFood, fat, carbs, calories, protein, servingSize, foodId ],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      }
    );
  });
};

const deleteFood = (foodId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM food WHERE food_id = ?',[foodId],(err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      }
    );
  });
};

module.exports = {
  getAllFood,
  addFood,
  updateFood,
  deleteFood
} 