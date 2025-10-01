import React from 'react';
import bannerImg from '../assets/banner/2banner_1.webp';
import bannerImg1 from '../assets/banner/2banner_2.webp';
import { Link } from 'react-router-dom';

const BannerSection = () => {
    // Dữ liệu cho 2 banner
    const banners = [
        {
            title: 'Bánh nướng & Sữa',
            subtitle: 'Vị béo',
            imageUrl: bannerImg,
            link: '/all-products',
        },
        {
            title: 'Bánh & Trà',
            subtitle: 'Hương vị tươi',
            imageUrl: bannerImg1,
            link: '/all-products',
        },
    ];

    return (
        <section className="py-12 section_2_banner">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {banners.map((banner) => (
                        <div key={banner.title} className="col-span-1">
                            <Link to={banner.link || '#'} className="relative block overflow-hidden rounded-xl group">
                                {/* Thumb Image */}
                                <img
                                    className="object-cover w-full h-auto transition-transform duration-[2000ms] ease-in-out rounded-xl aspect-[810/525]"
                                    src={banner.imageUrl}
                                    alt={banner.title}
                                />

                                {/* Overlay nền mờ */}
                                <div className="absolute inset-0 transition-opacity duration-700 bg-gray-200 opacity-0 group-hover:opacity-40"></div>

                                {/* Thumb Content */}
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center md:p-10">
                                    <h3 className="font-serif text-xl font-semibold text-black md:text-4xl drop-shadow-sm">
                                        {banner.title}
                                    </h3>

                                    <p className="mt-3 text-lg font-normal text-black md:text-2xl drop-shadow-sm">
                                        {banner.subtitle}
                                    </p>

                                    <div className="mt-6 transition-all duration-500 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        <Link
                                            to={banner.link || '#'}
                                            className="relative text-lg font-normal text-black after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-500 hover:after:w-full"
                                        >
                                            Khám phá tất cả
                                        </Link>
                                    </div>
                                </div>

                                {/* Overlay border animation */}
                                <div className="absolute inset-0 z-20 pointer-events-none">
                                    <span className="border-line top"></span>
                                    <span className="border-line right"></span>
                                    <span className="border-line bottom"></span>
                                    <span className="border-line left"></span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
