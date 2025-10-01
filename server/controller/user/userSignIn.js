const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error('Vui lòng nhập email');
        }
        if (!password) {
            throw new Error('Vui lòng nhập mật khẩu');
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        console.log('Kết quả kiểm tra mật khẩu:', checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(
                tokenData,
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: 60 * 60 * 8 }, // 8 giờ
            );

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            };

            res.cookie('token', token, tokenOption).status(200).json({
                message: 'Đăng nhập thành công',
                data: token,
                success: true,
                error: false,
            });
        } else {
            throw new Error('Mật khẩu không chính xác, vui lòng thử lại');
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
