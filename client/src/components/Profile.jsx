import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import SummaryApi from '../common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [originalUser, setOriginalUser] = useState(null); // giữ bản gốc để reset
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient({
                    url: SummaryApi.current_user.url,
                    method: SummaryApi.current_user.method,
                });
                setUser(res.data.data);
                setOriginalUser(res.data.data); // lưu thông tin ban đầu
            } catch (err) {
                toast.error(err.response?.data?.message || 'Không tải được thông tin người dùng');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient({
                url: SummaryApi.profile.url,
                method: SummaryApi.profile.method,
                data: user,
            });
            toast.success(res.data.message || 'Cập nhật hồ sơ thành công!');
            setOriginalUser(user); // cập nhật lại bản gốc sau khi lưu
        } catch (err) {
            toast.error(err.response?.data?.message || 'Cập nhật thất bại');
        }
    };

    const handleCancel = () => {
        if (originalUser) {
            setUser(originalUser); // khôi phục lại dữ liệu cũ
            toast.info('Đã hủy thay đổi');
        }
    };

    if (loading) return <div className="mt-20 text-lg text-center">Đang tải...</div>;

    return (
        <div className="max-w-6xl px-6 mx-auto mt-20">
            <div className="grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="col-span-3 p-6 bg-white shadow rounded-xl">
                    <div className="flex flex-col items-center">
                        <img
                            src={`https://ui-avatars.com/api/?name=${
                                user.name || 'User'
                            }&background=FACC15&color=fff&size=128`}
                            alt="avatar"
                            className="w-24 h-24 mb-4 border rounded-full"
                        />
                        <h2 className="text-lg font-semibold">{user.name || 'Người dùng'}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <ul className="mt-6 space-y-3 text-sm font-medium">
                        <li className="px-3 py-2 text-yellow-600 rounded-lg cursor-pointer bg-yellow-50">
                            Thông tin cá nhân
                        </li>
                        <li className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">Đơn hàng của tôi</li>
                        <li className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">Địa chỉ giao hàng</li>
                        <li className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">Cài đặt tài khoản</li>
                    </ul>
                </div>

                {/* Nội dung chính */}
                <div className="col-span-9 p-8 bg-white shadow rounded-xl">
                    <h3 className="mb-6 text-xl font-semibold">Cập nhật thông tin</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Họ và tên</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                disabled
                                className="w-full px-4 py-2 text-gray-500 bg-gray-100 border rounded-lg cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 font-semibold text-gray-600 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 font-semibold text-white transition bg-yellow-500 rounded-lg hover:bg-yellow-600"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Profile;
