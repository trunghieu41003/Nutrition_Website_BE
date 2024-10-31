// src/controller/UserController.js
const usermodel = require('../models/user.model');
const goalmodel = require('../models/goal.model');
const listfoodmodel = require('../models/listfood.model');
const diarymodel = require('../models/diary.model');
const mymealcontroller = require('../controllers/mymeal.controller');
const TDEEService = require('../services/TDEEService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Xử lý đăng ký người dùng
const signUp = async (req, res) => {
  const { date, name, email, password, height, weight, birthday, gender, activity_level, goal_type, weight_goal } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await usermodel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await usermodel.createUser({
      name, email, password: hashedPassword, height, weight, birthday, gender, activity_level
    });
    // Tạo mục tiêu mới
    const newGoal = await goalmodel.newGoal({ goal_type, weight_goal });

    // Liên kết người dùng với mục tiêu
    await goalmodel.linkUserGoal(newGoal.goalId, newUser.userId);
    const newDiary = await diarymodel.newDiary(date, newUser.userId);

    await TDEEService.updateUserTDEEAndDiary(newUser.userId, newDiary.diaryId, newUser, newGoal, newGoal.goalId);
    const user = await usermodel.findUserByID(newUser.userId);
    const daytoGoal = await goalmodel.getGoalinformation(newGoal.goalId);
    // Trả về cả userId và goalId
    res.status(201).json({ message: 'Đăng ký thành công', user: user, goal: daytoGoal });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ký', error: error.message });
  }
};

// Xử lý đăng nhập
const logIn = async (req, res) => {
  const { email, password, date } = req.body;

  try {
    // Kiểm tra xem email có tồn tại không
    const user = await usermodel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }
    // Tạo token hoặc session
    const token = jwt.sign({ userId: user.user_id, email: user.email }, 'secret_key', { expiresIn: '1h' });
    //const curdate = new Date().toISOString().slice(0, 10)
    //const diary = await diarymodel.getDiary(curdate, user.user_id);
    /*if (!diary) {
      // Tạo một req.body mới để truyền cho addNewDiary
      const reqForDiary = { body: { date: curdate, userId: user.user_id } };
      await mymealcontroller.addNewDiary(reqForDiary, res);  // Gọi hàm addNewDiary
    }*/
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng nhập', error: error.message });
  }
};

// Xử lý đăng xuất
const logout = (req, res) => {
  // Xóa session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi đăng xuất' });
    }
    res.status(200).json({ message: 'Đăng xuất thành công' });
  });
};

module.exports = {
  signUp,
  logIn,
  logout,
};
