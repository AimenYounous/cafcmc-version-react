import React, { useRef, useEffect } from 'react';

const VideoModal = ({ isOpen, onClose }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isOpen && videoRef.current) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/95 z-[1000] flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="relative w-[90%] max-w-[800px] aspect-video flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    className="absolute -top-[50px] right-0 text-white text-[3rem] cursor-pointer font-sans leading-none"
                    onClick={onClose}
                >
                    &times;
                </span>
                <video
                    ref={videoRef}
                    className="w-full h-auto rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                    controls
                    playsInline
                >
                    <source src="/assets/videos/vid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoModal;
