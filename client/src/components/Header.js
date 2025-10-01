import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { GrSearch } from 'react-icons/gr';
import { FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { throttle } from 'lodash';

import Logo from './Logo';
import SummaryApi from '../common';
import ROLE from '../common/role';
import Context from '../context';
import { setUserDetails } from '../store/userSlice';

const Header = () => {
    const user = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch();
    const context = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuDisplay, setMenuDisplay] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const dropdownRef = useRef(null);
    const mobileSearchRef = useRef(null);

    const searchQuery = new URLSearchParams(location?.search).get('q') || '';
    const [search, setSearch] = useState(searchQuery);

    // Throttle scroll handler để ẩn/hiện header mượt
    const handleScroll = useCallback(
        throttle(() => {
            if (window.scrollY > lastScrollY) setShowHeader(false);
            else setShowHeader(true);
            setLastScrollY(window.scrollY);
        }, 200),
        [lastScrollY],
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Load user từ localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) dispatch(setUserDetails(JSON.parse(savedUser)));
        else dispatch(setUserDetails(null));
    }, [dispatch]);

    // Click outside & ESC key cho dropdown + mobile search
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setMenuDisplay(false);
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) setMobileSearchOpen(false);
        };
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setMenuDisplay(false);
                setMobileSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch(SummaryApi.logout_user.url, {
                method: SummaryApi.logout_user.method,
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message || 'Logout successful!');
                dispatch(setUserDetails(null));
                localStorage.removeItem('user');
                navigate('/login');
            } else toast.error(data.message || 'Logout failed!');
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong!');
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        navigate(value ? `/search?q=${value}` : '/search');
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-white shadow-sm z-50 transform transition-transform duration-300 ${
                showHeader ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <nav className="relative flex items-center justify-between p-4 mx-auto lg:px-8 max-w-7xl">
                {/* Logo */}
                <div className="flex flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <Logo w={157} h={40} />
                    </Link>
                </div>

                {/* Search desktop */}
                <div className="justify-center flex-1 hidden md:flex">
                    <div className="flex items-center border rounded-full px-3 py-1.5 gap-2 w-full max-w-md transition-shadow hover:shadow-md">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="flex-1 placeholder-gray-500 bg-transparent outline-none"
                            value={search}
                            onChange={handleSearch}
                        />
                        <GrSearch className="text-gray-500" />
                    </div>
                </div>

                {/* Right icons */}
                <div className="flex items-center justify-end flex-1 gap-6">
                    {/* Mobile search */}
                    <button className="block text-2xl md:hidden" onClick={() => setMobileSearchOpen((prev) => !prev)}>
                        <GrSearch />
                    </button>

                    {/* Cart */}
                    <Link to="/cart" className="relative text-2xl">
                        <FiShoppingCart />
                        <div
                            className={`absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-[#FF4C3B] rounded-full -top-2 -right-3 transform transition-all duration-200 ease-out ${
                                context?.cartProductCount > 0
                                    ? 'opacity-100 scale-100 pointer-events-auto'
                                    : 'opacity-0 scale-75 pointer-events-none'
                            }`}
                        >
                            {context?.cartProductCount}
                        </div>
                    </Link>

                    {/* User / login */}
                    {user?._id ? (
                        <div ref={dropdownRef} className="relative">
                            <div
                                className="flex items-center gap-2 text-gray-800 cursor-pointer"
                                onClick={() => setMenuDisplay((prev) => !prev)}
                            >
                                {user?.profilePic ? (
                                    <img src={user.profilePic} alt={user.name} className="w-10 h-10 rounded-full" />
                                ) : (
                                    <FiUser className="text-2xl" />
                                )}
                            </div>

                            {/* Dropdown menu */}
                            <div
                                className={`absolute right-0 w-44 mt-2 bg-white border rounded shadow-lg transition-all duration-200 ease-out transform ${
                                    menuDisplay
                                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                                        : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                            >
                                {user?.role === ROLE.ADMIN && (
                                    <Link
                                        to="/admin-panel/all-products"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                        onClick={() => setMenuDisplay(false)}
                                    >
                                        Admin Panel
                                    </Link>
                                )}

                                <Link
                                    to="/profile"
                                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuDisplay(false)}
                                >
                                    <ImProfile className="mr-2" />
                                    <span>Profile</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMenuDisplay(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center w-full gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2 text-white bg-[#0DA487] rounded-full hover:bg-[#0b8c73] transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile search input */}
                {mobileSearchOpen && (
                    <div
                        ref={mobileSearchRef}
                        className="absolute left-0 w-full px-4 mt-2 transition-all duration-300 top-full md:hidden"
                    >
                        <div className="flex items-center border rounded-full px-3 py-1.5 gap-2 bg-white shadow-md">
                            <input
                                type="text"
                                placeholder="Search products"
                                className="flex-1 placeholder-gray-500 bg-transparent outline-none"
                                value={search}
                                onChange={handleSearch}
                                autoFocus
                            />
                            <button onClick={() => setMobileSearchOpen(false)}>✕</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
