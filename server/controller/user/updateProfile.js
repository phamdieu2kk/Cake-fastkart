const userModel = require('../../models/userModel');

async function updateProfile(req, res) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: 'Chưa xác thực người dùng',
                success: false,
                error: true,
            });
        }

        const user = await userModel.findById(req.userId).select('-password'); // loại bỏ password

        if (!user) {
            return res.status(404).json({
                message: 'Không tìm thấy người dùng',
                success: false,
                error: true,
            });
        }

        // 👉 Kiểm tra số điện thoại có trùng với user khác không
        if (req.body.phone) {
            const existedPhone = await userModel.findOne({
                phone: req.body.phone,
                _id: { $ne: req.userId }, // loại bỏ chính user hiện tại
            });

            if (existedPhone) {
                return res.status(400).json({
                    message: 'Số điện thoại đã được sử dụng bởi người dùng khác',
                    success: false,
                    error: true,
                });
            }
        }

        // 👉 Kiểm tra có thay đổi dữ liệu hay không
        const isSame =
            (req.body.name === undefined || req.body.name === user.name) &&
            (req.body.email === undefined || req.body.email === user.email) &&
            (req.body.phone === undefined || req.body.phone === user.phone) &&
            (req.body.address === undefined || req.body.address === user.address);

        if (isSame) {
            return res.status(200).json({
                data: user,
                success: true,
                error: false,
                message: 'Thông tin không có gì thay đổi',
            });
        }

        // Nếu có thay đổi thì cập nhật
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        const updatedUser = await user.save();

        res.status(200).json({
            data: updatedUser,
            success: true,
            error: false,
            message: 'Cập nhật thông tin người dùng thành công',
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Lỗi máy chủ',
            success: false,
            error: true,
        });
    }
}

module.exports = updateProfile;
