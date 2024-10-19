const connection = require('../config/database');

const getReport = (userId, days) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT Sum(calories_consumed)
        FROM diary 
        WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      `;
      connection.query(query, [userId, days], (err, results) => {
        if (err) {
          return reject(err); // Trả về lỗi nếu có
        }
        resolve(results); // Trả về kết quả nếu thành công
      });
    });
  };

  const getReportDetails = (userId, days) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT calories_consumed as calories_consumed, DATE_FORMAT(date, '%Y-%m-%d') AS date
        FROM diary 
        WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      `;
      connection.query(query, [userId, days], (err, results) => {
        if (err) {
          return reject(err); // Trả về lỗi nếu có
        }
        resolve(results); // Trả về kết quả nếu thành công
      });
    });
  };

module.exports = {
    getReport,
    getReportDetails
}  