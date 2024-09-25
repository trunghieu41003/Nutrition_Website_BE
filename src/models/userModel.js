// src/model/foodModel.js
const connection = require('../config/database');

// Lấy tất cả User
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Thêm một User mới
const createUser = (foodData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', foodData, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Cập nhật thông tin User
const updateUser = (id, foodData) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE users SET ? WHERE user_id = ?', [foodData, id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Xóa User
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM users WHERE user_id = ?', [id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};