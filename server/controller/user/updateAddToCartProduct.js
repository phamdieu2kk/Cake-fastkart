const addToCartModel = require('../../models/cartProduct');

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const { _id, quantity } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: 'Cần truyền vào _id sản phẩm trong giỏ hàng',
                success: false,
                error: true,
            });
        }

        const updateProduct = await addToCartModel.updateOne(
            { _id, userId: currentUserId },
            { ...(quantity && { quantity }) },
        );

        res.json({
            message: 'Cập nhật sản phẩm trong giỏ hàng thành công',
            data: updateProduct,
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || 'Đã xảy ra lỗi khi cập nhật giỏ hàng',
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddToCartProduct;
