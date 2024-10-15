const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy token sau "Bearer"

  if (!token) return res.status(401).json({ message: 'Access token required' });

  // Giải mã token
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    req.user = user; // Lưu thông tin user vào request object
    next(); // Cho phép tiếp tục xử lý controller tiếp theo
  });
};

module.exports = authenticateToken;
