const userModel = require('../../models/userModel');

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        // Kiểm tra người dùng trong session
        const user = await userModel.findById(sessionUser);
        if (!user) {
            return res.status(401).json({
                message: 'Chưa xác thực: Vui lòng đăng nhập lại',
                error: true,
                success: false,
            });
        }

        console.log('Quyền của user hiện tại:', user.role);

        // Tạo dữ liệu cần cập nhật
        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        // Kiểm tra nếu không có dữ liệu nào để cập nhật
        if (Object.keys(payload).length === 0) {
            return res.status(400).json({
                message: 'Không có thông tin nào để cập nhật',
                error: true,
                success: false,
            });
        }

        // Thực hiện cập nhật
        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng',
                error: true,
                success: false,
            });
        }

        // Tùy chỉnh thông báo
        let successMessage = 'Cập nhật thông tin người dùng thành công';
        if (payload.role && payload.role === 'ADMIN') {
            successMessage = 'Chúc mừng! Người dùng đã được nâng cấp thành Quản trị viên.';
        }

        res.json({
            data: updatedUser,
            message: successMessage,
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Lỗi máy chủ nội bộ',
            error: true,
            success: false,
        });
    }
}

module.exports = updateUser;
