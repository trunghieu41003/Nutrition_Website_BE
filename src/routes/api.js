const express = require('express');
const router = express.Router();

// Dữ liệu tạm thời (mảng)
let users = [];

// Thêm người dùng (POST)
router.post('/add', (req, res) => {
  const { name, age, email } = req.body;
  const newUser = {
    id: users.length + 1, // Tạo ID tự động
    name,
    age,
    email
  };
  users.push(newUser); // Thêm người dùng vào mảng
  res.status(201).json({ 
    message: 'Thêm người dùng thành công!', 
    user: newUser 
  });
});

// Lấy danh sách người dùng (GET)
router.get('/users', (req, res) => {
  res.json(users); // Trả về toàn bộ danh sách người dùng
});

// Sửa thông tin người dùng (PUT)
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  
  // Tìm người dùng theo ID
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
  }

  // Cập nhật thông tin người dùng
  user.name = name !== undefined ? name : user.name;
  user.age = age !== undefined ? age : user.age;
  user.email = email !== undefined ? email : user.email;

  res.json({ 
    message: 'Cập nhật thông tin thành công!', 
    user: user // Trả về thông tin người dùng đã cập nhật
  });
});

// Xóa người dùng (DELETE)
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  // Lọc bỏ người dùng có ID được cung cấp
  const userIndex = users.findIndex(u => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
  }

  // Lưu thông tin người dùng trước khi xóa
  const deletedUser = users[userIndex];

  // Xóa người dùng khỏi mảng
  users.splice(userIndex, 1);

  res.json({ 
    message: 'Xóa người dùng thành công!', 
    user: deletedUser // Trả về thông tin người dùng đã xóa
  });
});

module.exports = router;
