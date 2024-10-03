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

// Cập nhật thông tin User
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserData = req.body;
    const result = await UserModel.updateUser(id, UserData);
    const TDEE = UserModel.calculateTDEE(UserData);
    await UserModel.updateUserTDEE(id, TDEE);
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

const addUser = async (req, res) => {
  try {
    // Bước 1: Lấy thông tin user từ body request
    const newUser = req.body;

    // Bước 2: Thêm user mới vào database
    const result = await UserModel.createUser(newUser);
    const userId = result.insertId; // Lấy userId sau khi tạo

    // Bước 3: Tính toán TDEE dựa trên thông tin của user
    const TDEE = UserModel.calculateTDEE(newUser); // Hàm này sẽ tính toán TDEE dựa trên thông tin user
    
    // Bước 4: Cập nhật trường TDEE cho user vừa tạo
    await UserModel.updateUserTDEE(userId, TDEE);

    // Bước 5: Trả về kết quả thành công
    res.status(201).json({ message: 'User created', userId: userId, TDEE: TDEE });
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
