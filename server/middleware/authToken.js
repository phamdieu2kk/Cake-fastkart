const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'Vui lòng đăng nhập trước!',
                success: false,
                error: true,
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại!',
                    success: false,
                    error: true,
                });
            }

            req.userId = decoded._id; // lưu id user vào request để dùng cho API sau
            next();
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Lỗi máy chủ',
            success: false,
            error: true,
        });
    }
}

module.exports = authToken;
