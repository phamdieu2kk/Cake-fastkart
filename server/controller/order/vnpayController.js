// controller/order/vnpayController.js
const crypto = require('crypto');
const qs = require('qs');
const dayjs = require('dayjs');
const orderModel = require('../../models/orderProductModel');
const userModel = require('../../models/userModel');
const ProductModel = require('../../models/productModel');
const vnp = require('../../config/vnpay');
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay');

const sortObject = (obj) => {
    const sorted = {};
    Object.keys(obj)
        .sort()
        .forEach((key) => (sorted[key] = obj[key]));
    return sorted;
};

function generatePayID() {
    // Tạo ID thanh toán bao gồm cả giây để tránh trùng lặp
    const now = new Date();
    const timestamp = now.getTime();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    return `PAY${timestamp}${seconds}${milliseconds}`;
}

const vnpayController = async (req, res) => {
    try {
        const { cartItems, shippingFee, cartIds } = req.body; // <-- thêm cartIds

        if (!cartItems || cartItems.length === 0)
            return res.status(400).json({ message: 'Cart is empty', success: false });

        const shipping = parseInt(shippingFee) || 0;
        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found', success: false });

        const productIds = cartItems.map((item) => item.productId);
        const productsFromDB = await ProductModel.find({ _id: { $in: productIds } });

        const products = cartItems.map((item) => {
            const product = productsFromDB.find((p) => p._id.toString() === item.productId);
            return {
                productId: product._id,
                quantity: item.quantity,
                sellingPrice: product.sellingPrice,
                productName: product.productName,
                productImage: product.productImage[0],
            };
        });

        const totalAmount = products.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0) + shipping;

        const vnpay = new VNPay({
            tmnCode: 'DH2F13SW',
            secureSecret: '7VJPG70RGPOWFO47VSBT29WPDYND0EJG',
            vnpayHost: 'https://sandbox.vnpayment.vn',
            testMode: true,
            hashAlgorithm: 'SHA512',
            loggerFn: ignoreLogger,
        });

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const vnpayResponse = await vnpay.buildPaymentUrl({
            vnp_Amount: totalAmount * 1000,
            vnp_IpAddr: '127.0.0.1',
            vnp_TxnRef: `${generatePayID()}`,
            vnp_OrderInfo: `${req.userId}_${cartIds.join(',')}`, // <-- đây là OK
            vnp_OrderType: ProductCode.Other,
            vnp_ReturnUrl: `http://localhost:5000/api/vnpay-return`,
            vnp_Locale: VnpLocale.VN,
            vnp_CreateDate: dateFormat(new Date()),
            vnp_ExpireDate: dateFormat(tomorrow),
        });

        return res.status(201).json({ data: vnpayResponse });
    } catch (error) {
        console.error('VNPay Checkout Error:', error);
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = vnpayController;
