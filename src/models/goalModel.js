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

// Update user goal function
const updateUserGoal = (goalId, goal) => {
  return new Promise((resolve, reject) => {
    let query = 'UPDATE goal SET ';
    let params = [];

    // Building the query dynamically
    if (goal.goal_type) {
      query += 'goal_type = ?, ';
      params.push(goal.goal_type);
    }
    if (goal.weight_goal) {
      query += 'weight_goal = ?, ';
      params.push(goal.weight_goal);
    }

    // Remove the last comma and space
    query = query.slice(0, -2); // Remove the last comma and space

    // Add the WHERE clause
    query += ' WHERE goal_id = ?'; // Ensure correct column name (goal_id)
    params.push(goalId);

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
module.exports = {
    newGoal,
    updateGoal,
    linkUserGoal,
    updatedaytoGoal,
    getGoalinformation,
    findGoalbyUser,
    updateUserGoal
};