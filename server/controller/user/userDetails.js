const userModel = require('../../models/userModel');

async function userDetailsController(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: 'Chưa xác thực người dùng',
                success: false,
                error: true,
            });
        }

        const user = await userModel.findById(req.userId).select('-password'); // loại bỏ mật khẩu

        if (!user) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng',
                success: false,
                error: true,
            });
        }

        res.status(200).json({
            data: user,
            success: true,
            error: false,
            message: 'Lấy thông tin người dùng thành công',
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Lỗi máy chủ',
            success: false,
            error: true,
        });
    }
}

module.exports = userDetailsController;
