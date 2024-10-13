// controllers/TDEEController.js
const TDEEService = require('../services/TDEEService');

// Hàm xử lý yêu cầu cập nhật TDEE và nhật ký của người dùng
const updateUserTDEE = async (req, res) => {
    const { userId } = req.params;  // Lấy userId từ params (URL)

    try {
        // Gọi service để tính TDEE và cập nhật nhật ký
        await TDEEService.updateUserTDEEAndDiary(userId);

        // Trả về phản hồi thành công cho client
        res.status(200).json({ message: 'Cập nhật TDEE và nhật ký thành công' });
    } catch (error) {
        // Xử lý lỗi nếu xảy ra
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateUserTDEE
};
