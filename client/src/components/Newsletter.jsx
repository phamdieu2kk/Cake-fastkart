import React, { useRef, useEffect, useState } from 'react';
import { MdOutlineMailOutline } from 'react-icons/md';
import sideImg from '../assets/banner/image_mailchimp.webp';

const Newsletter = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 },
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-6">
            <div
                className={`container relative mx-auto overflow-hidden shadow-lg rounded-xl transform transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Image column */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={sideImg}
                            alt="Newsletter"
                            loading="lazy"
                            className="object-cover w-full h-full md:rounded-l-xl"
                        />
                    </div>

                    {/* Text + Form column */}
                    <div className="flex flex-col items-center w-full py-6 text-gray-900 bg-amber-100 rounded-r-xl md:w-1/2 md:py-8">
                        <div className="flex items-center justify-center p-3 bg-red-100 rounded-full">
                            <MdOutlineMailOutline className="text-3xl text-red-500" />
                        </div>

                        <h2 className="mt-3 text-lg font-medium text-slate-900">Đăng ký nhận tin</h2>
                        <p className="mt-1 text-sm text-center text-slate-900/60 md:w-80 w-72">
                            Đăng ký ngay và được giảm giá 15% cho lần mua hàng đầu tiên và nhiều chương trình hấp dẫn
                            dành cho bạn!
                        </p>

                        <div className="flex flex-col w-full px-4 mt-6 md:flex-row md:px-8 md:gap-2">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full h-12 px-4 mb-2 text-base border rounded-lg outline-none border-gray-500/50 focus:ring-2 focus:ring-yellow-400 md:mb-0 md:rounded-l-lg md:border-r-0"
                            />
                            <button
                                type="button"
                                className="h-12 text-base font-medium text-white transition-all bg-yellow-500 rounded-lg hover:bg-yellow-600 md:rounded-r-lg md:w-44"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
