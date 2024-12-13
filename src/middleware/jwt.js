const jwt = require('jsonwebtoken');
const usermodel = require('../models/user.model')
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Lấy token sau "Bearer"

  if (!token) return res.status(401).json({ message: 'Access token required' });

  // Giải mã token
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    if (req.method === 'GET') {
      req.query.userId = user.userId;
    } else {
      req.body.userId = user.userId;
    }
    next(); // Cho phép tiếp tục xử lý controller tiếp theo
  });
};

const authenticateAdmin = async (req, res, next) => {
  try {
      // Assume the JWT is passed in Authorization header as Bearer token
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
          return res.status(401).json({ message: 'Token not provided' });
      }

      // Verify token
      const user = jwt.verify(token, 'secret_key');
      if (!user) {
          return res.status(403).json({ message: 'Forbidden' });
      }

      // Find user in the database
      const user1 = await usermodel.findUserByID(user.userId);
      if (!user1) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if user is an admin
      if (user1.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied: Admins only' });
      }

      // Attach userId to the request
      if (req.method === 'GET') {
          req.query.userId = user.userId;
      } else {
          req.body.userId = user.userId;
      }

      next();
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  authenticateToken,
  authenticateAdmin
};
