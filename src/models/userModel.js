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
const createUser = (information) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', information, (err, results) => {
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

// Hàm cập nhật TDEE của user
const updateUserTDEE = (userId, TDEE) => {
  return new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET TDEE = ? WHERE user_id = ?';
    connection.query(updateQuery, [TDEE, userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// Hàm tính TDEE dựa trên thông tin user
const calculateTDEE = (user) => {
  const { weight, height, age, gender, activity_level } = user; // Lấy thông tin user
  let BMR;

  // Tính BMR dựa trên công thức Harris-Benedict
  if (gender === 'male') {
    BMR = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    BMR = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // Tính TDEE dựa trên BMR và mức độ hoạt động
  const TDEE = BMR * activity_level;
  return TDEE;
};

module.exports = {
  
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  
  updateUserTDEE,
  calculateTDEE,
};