// src/controller/UserController.js
const UserModel = require('../models/userModel');

// Lấy tất cả User
const getUsers = async (req, res) => {
  try {
    const Users = await UserModel.getAllUsers();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm một User mới
const addUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await UserModel.createUser(newUser);
    res.status(201).json({ message: 'User created', UserId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật thông tin User
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserData = req.body;
    const result = await UserModel.updateUser(id, UserData);
    res.json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.deleteUser(id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
