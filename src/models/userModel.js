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

const findUserByID = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT *, DATE_FORMAT(birthday, "%Y-%m-%d") AS birthday FROM User WHERE user_id = ?', 
      [userId], 
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]); // Trả về toàn bộ kết quả, bao gồm cả ngày đã định dạng
      }
    );
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
    const updateQuery = 'UPDATE user SET ? WHERE user_id = ?';
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


const updateUserInformation = (userId, userData) => {
  return new Promise((resolve, reject) => {
      let query = 'UPDATE user SET ';
      let params = [];

      // Building the query dynamically
      if (userData.gender) {
          query += 'gender = ?, ';
          params.push(userData.gender);
      }
      if (userData.birthday) {
          query += 'birthday = ?, ';
          params.push(userData.birthday);
      }
      if (userData.weight) {
          query += 'weight = ?, ';
          params.push(userData.weight);
      }
      if (userData.height) {
          query += 'height = ?, ';
          params.push(userData.height);
      }
      if (userData.activity_level) {
          query += 'activity_level = ?, ';
          params.push(userData.activity_level);
      }

      // Remove the last comma and space
      query = query.slice(0, -2); // Remove the last two characters (comma + space)

      // Add the WHERE clause
      query += ' WHERE user_id = ?';
      params.push(userId);

      // Execute the query
      connection.query(query, params, (error, results) => {
          if (error) {
              console.error('Error updating user information:', error); // Log error
              return reject(error); // Reject the promise on error
          }
          resolve(results); // Resolve with the results if successful
      });
  });
};


const getUserDiary = (userId) => {
  return new Promise((resolve, reject) => {
    const getQuery = 'SELECT diary_id From diary where user_id = ?';
    connection.query(getQuery, [userId], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updateCaloriesDaily = (userId, CaloriesDaily) => {
  return new Promise((resolve, reject) => {
    const getQuery = 'Update user SET calories_daily = ?';
    connection.query(getQuery, [ userId, CaloriesDaily], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
module.exports = {
  createUser,
  updateUser,
  findUserByEmail,
  createUser,
  getCaloriesGoal,
  findUserByID,
  updateUserInformation,
  getUserDiary,
  updateCaloriesDaily
};