const userModel = require('../../models/userModel');

// Lấy danh sách tất cả người dùng
async function allUsers(req, res) {
    try {
        console.log('📌 userId trong allUsers:', req.userId);

        // Lấy toàn bộ user, sắp xếp theo thời gian tạo (mới nhất trước)
        const users = await userModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Lấy danh sách người dùng thành công',
            data: users,
            success: true,
            error: false,
        });
    } catch (err) {
        console.error('❌ Lỗi trong allUsers:', err);

        return res.status(500).json({
            message: err.message || 'Lỗi máy chủ nội bộ',
            error: true,
            success: false,
        });
    }
}

module.exports = allUsers;
