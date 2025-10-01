import React from 'react';
import { Link } from 'react-router-dom'; // import Link
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="w-full text-gray-600 bg-white">
            <div className="px-6 py-10 mx-auto max-w-7xl md:px-16 lg:px-24 xl:px-32">
                {/* Top section */}
                <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
                    {/* Logo + description + app buttons */}
                    <div className="md:max-w-sm">
                        <Logo />
                        <p className="mt-6 text-sm text-gray-500">
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <img
                                src="https://themes.pixelstrap.com/fastkart/assets/images/playstore.svg"
                                alt="google play"
                                className="w-auto h-10 border border-gray-200 rounded"
                            />
                            <img
                                src="https://themes.pixelstrap.com/fastkart/assets/images/appstore.svg"
                                alt="app store"
                                className="w-auto h-10 border border-gray-200 rounded"
                            />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-1 gap-20 md:justify-end md:gap-40">
                        <div>
                            <h2 className="mb-5 font-semibold text-gray-800">Company</h2>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link to="/" className="hover:text-[#ff3c00] transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-[#ff3c00] transition-colors">
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-[#ff3c00] transition-colors">
                                        Contact us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:text-[#ff3c00] transition-colors">
                                        Privacy policy
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="mb-5 font-semibold text-gray-800">Get in touch</h2>
                            <div className="space-y-2 text-sm">
                                <p>+1-234-567-890</p>
                                <p>contact@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {/* Bottom */}
                <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 md:flex-row">
                    <p>
                        Copyright {new Date().getFullYear()} ©{' '}
                        <Link to="/" className="hover:text-[#ff3c00]">
                            PrebuiltUI
                        </Link>
                        . All Right Reserved.
                    </p>
                    <ul className="flex items-center gap-4">
                        <li>
                            <Link to="/" className="hover:text-[#ff3c00]">
                                Privacy
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:text-[#ff3c00]">
                                Terms
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:text-[#ff3c00]">
                                Sitemap
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
