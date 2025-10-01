// DisplayImage.jsx
import React, { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { createPortal } from 'react-dom';

const DisplayImage = ({ imgUrl, onClose }) => {
    const [visible, setVisible] = useState(false);

    // Fade-in khi mount
    useEffect(() => {
        setVisible(true);
    }, []);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleClose = () => {
        setVisible(false);
        // Delay để animation fade-out hoàn tất trước khi gọi onClose
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
        >
            <div
                className={`relative transition-transform duration-300 ${visible ? 'scale-100' : 'scale-90'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <img src={imgUrl} alt="full" className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-lg" />
                <div className="absolute text-2xl text-white cursor-pointer top-2 right-2" onClick={handleClose}>
                    <CgClose />
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default DisplayImage;
