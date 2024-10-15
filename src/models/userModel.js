// src/model/foodModel.js
const connection = require('../config/database');

// Tìm người dùng theo email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM User WHERE email = ?', [email], (err, results) => {
          if (err) {
              return reject(err);
          }
          resolve(results[0]); // Nếu không có lỗi, trả về kết quả tìm thấy
      });
  });
};


// Tìm người dùng theo ID
const findUserByID = (userId) => {
  return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM User WHERE user_id = ?', [userId], (err, results) => {
          if (err) {
              return reject(err);
          }
          resolve(results[0]); // Nếu không có lỗi, trả về kết quả tìm thấy
      });
  });
};

// Tạo người dùng mới
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
      const { name, email, password, height, weight, birthday, gender, activity_level } = userData;
      connection.query(
          'INSERT INTO User (name, email, password, height, weight, birthday, gender, activity_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [name, email, password, height, weight, birthday, gender, activity_level],
          (err, results) => {
              if (err) {
                  return reject(err);
              }
              resolve({ userId: results.insertId, ...userData }); // Trả về dữ liệu người dùng mới
          }
      );
  });
};


// Cập nhật thông tin User
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE users SET ? WHERE user_id = ?';
    connection.query(updateQuery, [userData, id], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


const getCaloriesGoal = (userId) => {
  return new Promise((resolve, reject) => {
    const getQuery = 'SELECT calories_remaining FROM diary WHERE user_id = ?';
    connection.query(getQuery, [userId], (err, results) => {
      if (err) reject(err);
      else if (results.length === 0) resolve(null); // Handle no results
      else resolve(results[0]); // Return the first result
    });
  });
};


module.exports = {
  createUser,
  updateUser,
  findUserByEmail,
  createUser,
  getCaloriesGoal,
  findUserByID
};