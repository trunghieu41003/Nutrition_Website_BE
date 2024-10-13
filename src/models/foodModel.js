// src/model/foodModel.js
const connection = require('../config/database');

// Lấy tất cả thực phẩm
const getAllFoods = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM food', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Thêm một thực phẩm mới
const createFood = (foodData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO food SET ?', foodData, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Cập nhật thông tin thực phẩm
const updateFood = (id, foodData) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE food SET ? WHERE food_id = ?', [foodData, id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Xóa thực phẩm
const deleteFood = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM food WHERE food_id = ?', [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
};
