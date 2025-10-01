const addToCartModel = require('../../models/cartProduct');

const vnpayReturnController = async (req, res) => {
    try {
        const vnp_Params = req.query; // VNPay callback params
        const vnp_ResponseCode = vnp_Params.vnp_ResponseCode;

        if (vnp_ResponseCode === '00') {
            // Parse vnp_OrderInfo để lấy cartIds
            // Format: "userId_cartId1,cartId2,cartId3"
            const [userId, cartIdsStr] = vnp_Params.vnp_OrderInfo.split('_');
            const cartIds = cartIdsStr ? cartIdsStr.split(',') : [];

            if (cartIds.length > 0) {
                await addToCartModel.deleteMany({ _id: { $in: cartIds } });
            }

            return res.redirect(`${process.env.FRONTEND_URL}/success`);
        } else {
            return res.redirect(`${process.env.FRONTEND_URL}/cancel`);
        }
    } catch (error) {
        console.error('Error in vnpayReturnController:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message,
        });
    }
};

module.exports = vnpayReturnController;
