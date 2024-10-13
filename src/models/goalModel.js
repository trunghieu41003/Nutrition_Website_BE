const connection = require('../config/database');

// Thêm một mục tiêu cho user
const newGoal = (goalData) => {
  return new Promise((resolve, reject) => {
      const { goal_type, weight_goal } = goalData;
      connection.query('INSERT INTO Goal (goal_type, weight_goal) VALUES (?, ?)', [goal_type, weight_goal], (err, result) => {
          if (err) reject(err);
          else resolve({ goalId: result.insertId, ...goalData });
      });
  });
};

// Cập nhật lại mục tiêu
const updateGoal = (goalId, goalData) => {
    return new Promise((resolve, reject) => {
        connection.query('Update goal SET ? where goal_id = ?', [goalData, goalId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

// Thêm một mục tiêu cho user
const linkUserGoal = (goalId, userId) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user_goal (goal_id, user_id) VALUES (?, ?)', [goalId, userId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
};


const updatedaytoGoal = (goalId, daytoGoal) => {
    return new Promise((resolve, reject) => {
      connection.query('Update goal SET days_to_goal = ? Where goal_id = ?', [daytoGoal, goalId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
};

// Thêm một mục tiêu cho user
const getGoalinformation = (goalId) => {
    return new Promise((resolve, reject) => {
      connection.query('Select * FROM goal WHERE goal_id = ?', [goalId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
};

module.exports = {
    newGoal,
    updateGoal,
    linkUserGoal,
    updatedaytoGoal,
    getGoalinformation
};