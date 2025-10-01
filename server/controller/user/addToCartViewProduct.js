const addToCartModel = require('../../models/cartProduct');

// Controller: Xem danh sách sản phẩm trong giỏ hàng
const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId; // Lấy userId từ token

        // Tìm tất cả sản phẩm trong giỏ hàng của user và populate để lấy chi tiết sản phẩm
        const allProduct = await addToCartModel
            .find({
                userId: currentUser,
            })
            .populate('productId');

        res.json({
            data: allProduct,
            message: 'Lấy danh sách giỏ hàng thành công',
            success: true,
            error: false,
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartViewProduct;
