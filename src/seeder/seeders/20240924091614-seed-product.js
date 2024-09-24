'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Product', [
      { 
        food_id: 1, 
        name_food: 'Chicken Breast', 
        calories: 165, 
        fat: 3.6, 
        carbs: 0, 
        protein: 31, 
        serving_size: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        food_id: 2, 
        name_food: 'Brown Rice', 
        calories: 110, 
        fat: 0.9, 
        carbs: 23, 
        protein: 2.6, 
        serving_size: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        food_id: 3, 
        name_food: 'Broccoli', 
        calories: 55, 
        fat: 0.6, 
        carbs: 11.2, 
        protein: 3.7, 
        serving_size: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        food_id: 4, 
        name_food: 'Salmon Fillet', 
        calories: 208, 
        fat: 13, 
        carbs: 0, 
        protein: 20, 
        serving_size: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        food_id: 5, 
        name_food: 'Almonds', 
        calories: 576, 
        fat: 49, 
        carbs: 21.6, 
        protein: 21.1, 
        serving_size: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Product', null, {});
  }
};
