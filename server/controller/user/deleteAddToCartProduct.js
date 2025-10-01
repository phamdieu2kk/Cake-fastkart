const addToCartModel = require('../../models/cartProduct');

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId });

        res.json({
            message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
            error: false,
            success: true,
            data: deleteProduct,
        });
    } catch (err) {
        res.json({
            message: err?.message || 'Đã xảy ra lỗi khi xóa sản phẩm khỏi giỏ hàng',
            error: true,
            success: false,
        });
    }
};

module.exports = deleteAddToCartProduct;
