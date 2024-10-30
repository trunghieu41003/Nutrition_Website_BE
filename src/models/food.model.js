const connection = require('../config/database');

const getAllFood = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT name food_id FROM food 
  `;
    connection.query(query, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

module.exports = {
  getAllFood
}  