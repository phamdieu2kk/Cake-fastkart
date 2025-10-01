import React, { useState } from 'react';
import moment from 'moment';
import displayVNDCurrency from '../helpers/displayCurrency';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const OrderItem = ({ order, showUserEmail = false }) => {
    const [showProducts, setShowProducts] = useState(true);

    const paymentStatus =
        order.vnpayDetails?.vnpay_status === 'success'
            ? { text: 'Thanh toán thành công', color: 'bg-green-100 text-green-700' }
            : { text: 'Chưa thanh toán', color: 'bg-red-100 text-red-700' };

    return (
        <div className="p-4 mb-6 transition-shadow duration-300 border rounded-lg shadow-sm hover:shadow-md">
            {/* Header */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowProducts((prev) => !prev)}
            >
                <p className="mb-2 text-lg font-medium">{moment(order.createdAt).format('LL')}</p>
                {showUserEmail && <p className="text-sm text-gray-500">{order.email}</p>}
                <div className="text-xl">{showProducts ? <FiChevronUp /> : <FiChevronDown />}</div>
            </div>

            {showProducts && (
                <>
                    {/* Products */}
                    <div className="flex flex-col gap-3 mt-3 lg:flex-row">
                        <div className="grid flex-1 gap-2">
                            {order.productDetails.map((product, idx) => (
                                <div
                                    key={product.productId + idx}
                                    className="flex gap-3 p-3 transition-all duration-300 rounded-lg shadow-sm bg-slate-50 hover:shadow-md group"
                                >
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="object-cover rounded-lg w-28 h-28 bg-slate-200"
                                        title={product.name}
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <p
                                            className="text-lg font-medium line-clamp-1 group-hover:underline"
                                            title={product.name}
                                        >
                                            {product.name}
                                        </p>
                                        <div className="flex items-center gap-5 mt-1">
                                            <p className="text-lg text-red-500">{displayVNDCurrency(product.price)}</p>
                                            <p>Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Payment & Shipping */}
                        <div className="flex flex-col gap-4 p-2 min-w-[250px] text-sm">
                            <div>
                                <p className="mb-1 text-lg font-medium">Payment Details:</p>
                                <p>Method: {order.vnpayDetails?.vnpay_method_type || 'N/A'}</p>
                                <span
                                    className={`inline-block px-2 py-1 mt-1 text-xs font-semibold rounded ${paymentStatus.color}`}
                                >
                                    {paymentStatus.text}
                                </span>
                                <p>Transaction ID: {order.vnpayDetails?.vnp_TxnRef || '---'}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-lg font-medium">Shipping Details:</p>
                                <p>Shipping Fee: {displayVNDCurrency(order.shippingFee || 0)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="mt-3 ml-auto text-lg font-semibold">
                        Total Amount: {displayVNDCurrency(order.totalAmount)}
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderItem;
