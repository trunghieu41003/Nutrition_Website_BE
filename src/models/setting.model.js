const connection = require('../config/database');

const updateUserInformation = (userId, user) => {
  return new Promise((resolve, reject) => {
    let query = 'UPDATE user SET ';
    let params = [];
    let setClause = []; // Mảng để lưu các điều kiện set

    // Xây dựng câu truy vấn động
    if (user.weight) {
      setClause.push('weight = ?');
      params.push(user.weight);
    }
    if (user.height) {
      setClause.push('height = ?');
      params.push(user.height);
    }

    if (user.birthday) {
      setClause.push('birthday = ?');
      params.push(user.birthday);
    }
    if (user.gender) {
      setClause.push('gender = ?');
      params.push(user.gender);
    }
    if (user.activity_level) {
      setClause.push('activity_level = ?');
      params.push(user.activity_level);
    }
    if (user.name) {
      setClause.push('name = ?');
      params.push(user.name);
    }
    // Nếu không có trường nào để cập nhật, chỉ cần resolve mà không thực hiện truy vấn
    if (setClause.length === 0) {
      return resolve({ message: 'Không có trường nào để cập nhật, không thực hiện thay đổi.' });
    }

    // Kết hợp các điều kiện set thành một chuỗi
    query += setClause.join(', '); // Thêm điều kiện vào câu truy vấn

    // Thêm điều kiện WHERE
    query += ' WHERE user_id = ?';
    params.push(userId);

    // Thực hiện truy vấn
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error('Error updating user information:', error); // Log error
        return reject(error); // Reject the promise on error
      }
      resolve(results); // Resolve với kết quả nếu thành công
    });
  });
};
const updateUserGoal = (goalId, goal) => {
  return new Promise((resolve, reject) => {
    let query = 'UPDATE goal SET ';
    let params = [];
    let setClause = []; // Mảng để lưu các điều kiện set

    // Xây dựng câu truy vấn động
    if (goal.goal_type) {
      setClause.push('goal_type = ?');
      params.push(goal.goal_type);
    }
    if (goal.weight_goal) {
      setClause.push('weight_goal = ?');
      params.push(goal.weight_goal);
    }

    // Nếu không có trường nào để cập nhật, chỉ cần resolve mà không thực hiện truy vấn
    if (setClause.length === 0) {
      return resolve({ message: 'Không có trường nào để cập nhật, không thực hiện thay đổi.' });
    }

    // Kết hợp các điều kiện set thành một chuỗi
    query += setClause.join(', '); // Thêm điều kiện vào câu truy vấn

    // Thêm điều kiện WHERE
    query += ' WHERE goal_id = ?';
    params.push(goalId);

    // Thực hiện truy vấn
    connection.query(query, params, (error, results) => {
      if (error) {
        console.error('Error updating user information:', error); // Log error
        return reject(error); // Reject the promise on error
      }
      resolve(results); // Resolve với kết quả nếu thành công
    });
  });
};

const findGoalbyUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM goal 
        WHERE goal_id IN (
          SELECT ug.goal_id
          FROM user_goal ug 
          WHERE ug.user_id = ?
        )
      `;
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('SQL Error:', err); // Log SQL error for debugging
        return reject(err); // Return if there's an error
      }
      resolve(results[0]); // Resolve with the query results
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

module.exports = {
  updateUserInformation,
  updateUserGoal,
  findGoalbyUser,
  findUserByID,

};