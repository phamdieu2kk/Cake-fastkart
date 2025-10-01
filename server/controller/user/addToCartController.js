const addToCartModel = require('../../models/cartProduct');

// Controller thêm sản phẩm vào giỏ hàng
const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body; // lấy productId từ request
        const currentUser = req.userId; // lấy userId từ token đã xác thực

        // Nếu không có productId
        if (!productId) {
            return res.status(400).json({
                message: 'Thiếu productId',
                success: false,
                error: true,
            });
        }

        // Kiểm tra xem sản phẩm này đã tồn tại trong giỏ hàng của user chưa
        const isProductAvailable = await addToCartModel.findOne({
            productId,
            userId: currentUser,
        });

        if (isProductAvailable) {
            return res.json({
                message: 'Sản phẩm đã có trong giỏ hàng',
                success: false,
                error: true,
            });
        }

        // Tạo dữ liệu mới cho giỏ hàng
        const payload = {
            productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: 'Đã thêm sản phẩm vào giỏ hàng',
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;
