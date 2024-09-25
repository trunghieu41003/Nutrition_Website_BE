// src/controller/foodController.js
const foodModel = require('../models/foodModel');

// Lấy tất cả thực phẩm
const getFoods = async (req, res) => {
  try {
    const foods = await foodModel.getAllFoods();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm một thực phẩm mới
const addFood = async (req, res) => {
  try {
    const newFood = req.body;
    const result = await foodModel.createFood(newFood);
    res.status(201).json({ message: 'Food created', foodId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật thông tin thực phẩm
const updateFood = async (req, res) => {
  try {
    const id = req.params.id;
    const foodData = req.body;
    const result = await foodModel.updateFood(id, foodData);
    res.json({ message: 'Food updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa thực phẩm
const deleteFood = async (req, res) => {
  try {
    const id = req.params.id;
    await foodModel.deleteFood(id);
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getFoods,
  addFood,
  updateFood,
  deleteFood,
};
