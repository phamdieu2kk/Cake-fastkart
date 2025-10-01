const addToCartModel = require('../../models/cartProduct');

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        // Đếm số sản phẩm trong giỏ của user
        const count = await addToCartModel.countDocuments({ userId });

        res.json({
            data: { count },
            message: 'Đếm số sản phẩm trong giỏ hàng thành công',
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Lỗi khi đếm sản phẩm trong giỏ hàng',
            error: true,
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;
