const { Model } = require('sequelize');
const connection = require('../config/database');

const findAllMeal = () => {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT * FROM meal;
  `;
        connection.query(query, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};
const addMeal = (mealData) => {
    return new Promise((resolve, reject) => {
        const { name } = mealData;
        connection.query(
            'INSERT INTO meal (name) VALUES (?)', [name], 
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
        );
    });
};

const updateMeal = (mealData) => {
    return new Promise((resolve, reject) => {
        const { name, id} = mealData;
        connection.query(
            'UPDATE meal SET name = ? WHERE meal_id = ?',
            [name, id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
        );
    });
};

const deleteMeal = (mealId) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'DELETE FROM meal WHERE meal_id = ?', [mealId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            }
        );
    });
};

const findMealByNameContaining = (searchString) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM meal WHERE name LIKE ?',
            [`%${searchString}%`], // Properly format the parameterized query
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
};
module.exports = {
    findAllMeal,
    addMeal,
    updateMeal,
    deleteMeal,
    findMealByNameContaining
}