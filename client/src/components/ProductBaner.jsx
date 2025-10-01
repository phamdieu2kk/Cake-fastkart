import React from 'react';
import { Link } from 'react-router-dom';

import bannerImg from '../assets/banner/about_1.webp';
import bannerImg1 from '../assets/banner/about_2.webp';

const banners = [
    {
        id: 1,
        title: 'Bánh Mousse Sữa Chua',
        content:
            'Những chiếc bánh mousse sữa chua béo thơm, mềm ngọt là món tráng miệng được nhiều người yêu thích trong những ngày oi bức.',
        imageUrl: bannerImg,
        link: '/all-products',
        aspect: 'aspect-[5/3]',
    },
    {
        id: 2,
        title: 'Bánh Dark Chocolate',
        content:
            'Nếu bạn là tín đồ của chocolate thì không thể bỏ qua loại bánh Dark Chocolate. Bánh đem lại vị đắng đặc trưng nguyên thủy của socola mà chỉ cần thử một lần là sẽ mê đắm.',
        imageUrl: bannerImg1,
        link: '/all-products',
        aspect: 'aspect-[16/9]',
    },
];

const ProductBanner = () => {
    const ContentBlock = ({ title, content, link }) => (
        <div className="flex flex-col justify-center py-8 md:py-12">
            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                <h3 className="font-serif text-3xl font-semibold leading-snug text-gray-800 md:text-4xl">{title}</h3>
                <p className="max-w-3xl text-sm leading-relaxed text-gray-700 md:text-base md:leading-loose">
                    {content}
                </p>
                <Link
                    to={link}
                    className="px-6 py-2 mt-2 text-sm font-medium text-gray-700 transition border border-gray-400 rounded hover:bg-gray-100"
                >
                    Xem ngay
                </Link>
            </div>
        </div>
    );

    const ImageBlock = ({ imageUrl, title, link, aspect }) => (
        <div className={`relative overflow-hidden rounded-xl shadow-lg group ${aspect}`}>
            <Link to={link} title={title} className="relative block">
                <img
                    src={imageUrl}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 pointer-events-none">
                    {['top', 'right', 'bottom', 'left'].map((pos) => (
                        <span key={pos} className={`border-line ${pos}`} />
                    ))}
                </div>
            </Link>
            <style>
                {`
          .border-line {
            position: absolute;
            background-color: white;
            opacity: 0;
          }
          .border-line.top,
          .border-line.bottom { height: 1px; }
          .border-line.left,
          .border-line.right { width: 1px; }

          .border-line.top { top: 8px; left: 50%; right: 50%; transform-origin: center; }
          .border-line.right { top: 50%; bottom: 50%; right: 8px; transform-origin: center; }
          .border-line.bottom { bottom: 8px; left: 50%; right: 50%; transform-origin: center; }
          .border-line.left { top: 50%; bottom: 50%; left: 8px; transform-origin: center; }

          .group:hover .border-line {
            opacity: 1;
          }
          .group:hover .border-line.top { animation: draw-horizontal 0.7s forwards; }
          .group:hover .border-line.right { animation: draw-vertical 0.7s forwards; }
          .group:hover .border-line.bottom { animation: draw-horizontal 0.7s forwards; }
          .group:hover .border-line.left { animation: draw-vertical 0.7s forwards; }

          @keyframes draw-horizontal { 0% { left: 50%; right: 50%; } 100% { left: 6px; right: 6px; } }
          @keyframes draw-vertical { 0% { top: 50%; bottom: 50%; } 100% { top: 8px; bottom: 8px; } }
        `}
            </style>
        </div>
    );

    return (
        <div className="container px-4 mx-auto">
            <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
                <ContentBlock {...banners[0]} />
                <ImageBlock {...banners[0]} aspect={banners[0].aspect} />

                <ImageBlock {...banners[1]} aspect={banners[1].aspect} />
                <ContentBlock {...banners[1]} />
            </div>
        </div>
    );
};

export default ProductBanner;
