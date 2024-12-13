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
    console.log(foodData)
    connection.query(
      'INSERT INTO food (name_food, fat, carbs, calories, protein, serving_size) VALUES (?, ?, ?, ?, ?, ?)',
      [nameFood, fat, carbs, calories, protein, servingSize],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(true); // Trả về dữ liệu người dùng mới
      }
    );
  });
};

module.exports = {
  getAllFood,
  addFood
} 